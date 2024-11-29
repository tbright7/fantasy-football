import { useState, useEffect } from "react";

export const useLeagueData = (
  leagueId: string,
  espn_s2: string,
  swid: string
) => {
  const [leagueData, setLeagueData] = useState<LeagueDataResponse | null>(null);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagueData = async () => {
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
      }
    };

    fetchLeagueData();
  }, [leagueId, espn_s2, swid]);

  return { leagueData, teamId, error };
};
