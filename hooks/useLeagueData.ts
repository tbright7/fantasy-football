import { useState, useEffect } from "react";
import { LeagueDataResponse } from "@/types";
export const useLeagueData = (
  leagueId: string,
  espn_s2: string,
  swid: string
) => {
  const [leagueData, setLeagueData] = useState<LeagueDataResponse | null>(null);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchLeagueData = async () => {
      setLoading(true); // Set loading to true before the fetch
      setError(null); // Reset error state
      try {
        const response = await fetch(
          `/api/espn/league?leagueId=${leagueId}&espn_s2=${espn_s2}&swid=${swid}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching league data: ${response.status}`);
        }

        const data = await response.json();
        setLeagueData(data.data);

        // Extract team ID
        const team = data.data.teams.find((team: any) =>
          team.owners.includes(swid)
        );
        if (team) {
          setTeamId(team.id);
        } else {
          throw new Error("Unable to find your team in the league data.");
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchLeagueData();
  }, [leagueId, espn_s2, swid]);

  return { leagueData, teamId, error, isLeagueDataLoading: loading };
};
