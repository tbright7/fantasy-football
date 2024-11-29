import { useState, useEffect } from "react";
import { TeamDataResponse } from "@/types";
export const useTeamData = (
  leagueId: string,
  teamId: number,
  espn_s2: string,
  swid: string
) => {
  const [teamData, setTeamData] = useState<TeamDataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true); // Set loading to true before the fetch
      setError(null); // Reset error state
      try {
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
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    if (teamId) {
      fetchTeamData();
    } else {
      setLoading(false); // Set loading to false if no teamId is provided
    }
  }, [leagueId, teamId, espn_s2, swid]);

  return { teamData, error, isTeamDataLoading: loading };
};
