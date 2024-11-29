import { useState, useEffect } from "react";

export const useTeamData = (
  leagueId: string,
  teamId: number,
  espn_s2: string,
  swid: string
) => {
  const [teamData, setTeamData] = useState<TeamDataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
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
      }
    };

    if (teamId) {
      fetchTeamData();
    }
  }, [leagueId, teamId, espn_s2, swid]);

  return { teamData, error };
};
