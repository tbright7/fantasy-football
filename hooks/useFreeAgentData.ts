"use client";
import { useState, useEffect } from "react";
import { LeagueDataResponse } from "@/types";
import { getCookieValue } from "@/lib/utils";

export const useFreeAgentData = (scoringPeriodId: number) => {
  const leagueId = getCookieValue("leagueId");
  const espn_s2 = getCookieValue("espn_s2");
  const swid = getCookieValue("swid");
  const [freeAgentData, setFreeAgentData] = useState<LeagueDataResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  useEffect(() => {
    const fetchFreeAgentData = async () => {
      setLoading(true); // Set loading to true before the fetch
      setError(null); // Reset error state
      try {
        const response = await fetch(
          `/api/espn/free-agents?leagueId=${leagueId}&espn_s2=${espn_s2}&swid=${swid}&scoringPeriodId=${scoringPeriodId}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching league data: ${response.status}`);
        }

        const data = await response.json();
        setFreeAgentData(data.data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchFreeAgentData();
  }, [leagueId, espn_s2, swid, scoringPeriodId]);

  return {
    freeAgentData,
    error,
    isFreeAgentDataLoading: loading,
  };
};
