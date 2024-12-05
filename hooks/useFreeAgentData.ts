"use client";
import { useState, useEffect } from "react";
import { FreeAgentDataResponse } from "@/types";
import { getCookieValue } from "@/lib/utils";

export const useFreeAgentData = (scoringPeriodId?: number) => {
  const leagueId = getCookieValue("leagueId");
  const espn_s2 = getCookieValue("espn_s2");
  const swid = getCookieValue("swid");

  const [freeAgentData, setFreeAgentData] =
    useState<FreeAgentDataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading starts false initially

  useEffect(() => {
    // Ensure all required parameters are defined
    if (!leagueId || !espn_s2 || !swid || scoringPeriodId === undefined) {
      setError("Missing required parameters for fetching free agent data.");
      setFreeAgentData(null); // Reset data in case of invalid state
      return;
    }

    const fetchFreeAgentData = async () => {
      setLoading(true); // Set loading to true before the fetch
      setError(null); // Reset error state

      try {
        const headers = {
          Cookie: `espn_s2=${espn_s2}; swid=${swid}; leagueId=${leagueId}; scoringPeriodId=${scoringPeriodId} seasonId=2024`,
        };
        const response = await fetch(`/api/espn/free-agents`, {
          credentials: "include", // Ensure credentials (cookies) are included
          headers, // Add the cookies to the request header
        });

        if (!response.ok) {
          throw new Error(`Error fetching league data: ${response.status}`);
        }

        const data = await response.json();
        setFreeAgentData(data.data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
        setFreeAgentData(null); // Reset data in case of an error
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
