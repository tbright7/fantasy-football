"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookieValue } from "@/lib/utils";

const LeagueDataContext = createContext(null);

export function LeagueDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leagueData, setLeagueData] = useState(null);
  const [team, setTeam] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const leagueId = getCookieValue("leagueId");
        const espn_s2 = getCookieValue("espn_s2");
        const swid = getCookieValue("swid");

        if (!leagueId || !espn_s2 || !swid) {
          throw new Error(
            "Missing required cookies: leagueId, espn_s2, or swid."
          );
        }

        const response = await fetch(
          `/api/espn/league?leagueId=${leagueId}&espn_s2=${espn_s2}&swid=${swid}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching league data: ${response.status}`);
        }

        const data = await response.json();
        const userTeam = data.data.teams.find((team: any) =>
          team.owners.includes(swid)
        );
        setTeam(userTeam);
        setTeamId(userTeam.id);
        setLeagueData(data.data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, []);

  return (
    <LeagueDataContext.Provider
      value={{ leagueData, loading, error, teamId, team }}
    >
      {children}
    </LeagueDataContext.Provider>
  );
}

export function useLeagueDataContext() {
  const context = useContext(LeagueDataContext);
  if (!context) {
    throw new Error(
      "useLeagueDataContext must be used within a LeagueDataProvider"
    );
  }
  return context;
}
