"use client";
import { useTeamData } from "@/hooks";
import { useLeagueDataContext } from "@/providers/LeagueDataProvider";
const DashboardPage = () => {
  const { teamId } = useLeagueDataContext();

  const { teamData, isTeamDataLoading } = useTeamData(teamId);

  if (isTeamDataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Fantasy Dashboard</h1>
      {teamData ? (
        <>
          <h2>Your Team Roster</h2>
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
