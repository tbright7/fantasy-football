"use client";

import { useState, useEffect } from "react";
import { TeamDataResponse } from "@/types";
import { getCookieValue } from "@/lib/utils";

export const useTeamData = (teamId: number | null) => {
  const [teamData, setTeamData] = useState<TeamDataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true); // Start loading state
      setError(null); // Reset any previous errors

      try {
        // Safely access cookies on the client side
        const leagueId = getCookieValue("leagueId");
        const espn_s2 = getCookieValue("espn_s2");
        const swid = getCookieValue("swid");

        if (!leagueId || !espn_s2 || !swid) {
          throw new Error(
            "Missing required cookies: leagueId, espn_s2, or swid."
          );
        }

        const response = await fetch(
          `/api/espn/team?leagueId=${leagueId}&teamId=${teamId}&espn_s2=${espn_s2}&swid=${swid}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching team data: ${response.status}`);
        }

        const data = await response.json();
        setTeamData(data.data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    if (teamId) {
      fetchTeamData();
    } else {
      setLoading(false); // No teamId, stop loading
    }
  }, [teamId]);

  return { teamData, error, isTeamDataLoading: loading };
};
