"use client";

import { useEffect, useState } from "react";
import { LeagueDataResponse, TeamDataResponse } from "@/types";
import { useLeagueData, useTeamData } from "@/hooks";
import { getCookieValue } from "@/lib/utils";
const DashboardPage = () => {
  const [error, setError] = useState("");

  const leagueId = getCookieValue("leagueId");
  const espn_s2 = getCookieValue("espn_s2");
  const swid = getCookieValue("swid");

  const { teamId } = useLeagueData(leagueId, espn_s2, swid);
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
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <>
          {teamData ? (
            <>
              <h2>Your Team Roster</h2>
              <pre>
                {teamData &&
                  JSON.stringify(
                    teamData.roster.entries.map(
                      (e) => e.playerPoolEntry.player.fullName
                    ),
                    null,
                    2
                  )}
              </pre>
            </>
          ) : (
            <p>Unable to fetch your team data.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;
