"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Team, LeagueDataResponse } from "@/types";

interface LeagueContextValue {
  leagueData: LeagueDataResponse | null;
  isLeagueDataLoading: boolean;
  error: string | null;
  teamId: number | null;
  team: Team | null;
  teams: Team[] | null;
}

const defaultValue: LeagueContextValue = {
  leagueData: null,
  isLeagueDataLoading: true, // Initially true as data is not yet loaded
  error: null,
  teamId: null,
  team: null,
  teams: null,
};

const LeagueDataContext = createContext<LeagueContextValue>(defaultValue);

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null; // Prevent server-side access
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
}

export function LeagueDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leagueData, setLeagueData] = useState<LeagueDataResponse | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [isLeagueDataLoading, setIsLeagueDataLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagueData = async () => {
      if (typeof document === "undefined") return;

      setIsLeagueDataLoading(true); // Set loading to true when fetching starts

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
        const userTeam = data.data.teams.find((team: Team) =>
          team.owners.includes(swid)
        );

        setTeams(data.data.teams);
        setTeam(userTeam);
        setTeamId(userTeam?.id || null); // Handle case where userTeam might be null
        setLeagueData(data.data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLeagueDataLoading(false); // Set loading to false when fetching is complete
      }
    };

    fetchLeagueData();
  }, []);

  return (
    <LeagueDataContext.Provider
      value={{ leagueData, isLeagueDataLoading, error, teamId, team, teams }}
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
