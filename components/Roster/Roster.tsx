import React from "react";
import { useTeamData } from "@/hooks";
import Player from "./Player";
export function Roster({
  teamId,
  scoringPeriodId,
  seasonId,
}: {
  teamId: number;
  scoringPeriodId: number;
  seasonId: number;
}) {
  const { teamData } = useTeamData(teamId);

  return (
    <table>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Projected Score</th>
          <th>Actual Score</th>
          <th>Average Score</th>
          <th>Positional Ranking</th>
          <th>Overall Ranking</th>
        </tr>
      </thead>
      {teamData?.roster.entries.map((entry) => (
        <Player
          entry={entry}
          key={entry.playerId}
          scoringPeriodId={scoringPeriodId}
          seasonId={seasonId}
        />
      ))}
    </table>
  );
}
