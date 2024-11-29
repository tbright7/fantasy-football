"use client";

import { useLeagueData, useTeamData } from "@/hooks";
import { getCookieValue } from "@/lib/utils";
const DashboardPage = () => {
  const leagueId = getCookieValue("leagueId");
  const espn_s2 = getCookieValue("espn_s2");
  const swid = getCookieValue("swid");

  const { teamId, userTeam } = useLeagueData(leagueId, espn_s2, swid);
  console.log(userTeam);
  const { teamData, isTeamDataLoading } = useTeamData(
    leagueId,
    teamId,
    espn_s2,
    swid
  );

  if (isTeamDataLoading) {
    return <p>Loading...</p>;
  }
  console.log(teamData);

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
