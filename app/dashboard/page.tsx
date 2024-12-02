"use client";
import { useTeamData } from "@/hooks";
import { useLeagueDataContext } from "@/providers/LeagueDataProvider";
import { Roster } from "@/components";
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
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!leagueData) {
    return <p>No league data available.</p>;
  }

  return (
    <div>
      <h1>Fantasy Dashboard</h1>
      {teamData && teamId ? (
        <>
          <h2>Your roster</h2>
          <Roster
            teamId={teamId}
            scoringPeriodId={leagueData.scoringPeriodId}
            seasonId={leagueData.seasonId}
          />
        </>
      ) : (
        <p>Unable to fetch your team data.</p>
      )}
    </div>
  );
};

export default DashboardPage;
