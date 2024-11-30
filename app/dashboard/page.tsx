"use client";

import { useTeamData } from "@/hooks";
import { useLeagueDataContext } from "@/providers/LeagueDataProvider";

const DashboardPage = () => {
  const {
    teamId,
    leagueData,
    loading: isLeagueLoading,
    error,
  } = useLeagueDataContext();
  const { teamData, isTeamDataLoading } = useTeamData(teamId);

  if (isLeagueLoading || isTeamDataLoading) {
    return <p>Loading...</p>;
  }
  console.log(teamId);
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!leagueData) {
    return <p>No league data available.</p>;
  }

  return (
    <div>
      <h1>Fantasy Dashboard</h1>
      {teamData ? (
        <>
          <h2>Your roster</h2>
          <ul>
            {teamData.roster.entries.map((e) => (
              <li key={e.playerId}>{e.playerPoolEntry.player.fullName}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Unable to fetch your team data.</p>
      )}
    </div>
  );
};

export default DashboardPage;
