import React from "react";
import { RosterEntry } from "@/types";
function Player({
  entry,
  scoringPeriodId,
  seasonId,
}: {
  entry: RosterEntry;
  scoringPeriodId: number;
  seasonId: number;
}) {
  function getCurrentScoringPeriodPoints() {
    return entry.playerPoolEntry.player.stats.filter(
      (stat) => stat.scoringPeriodId === scoringPeriodId
    );
  }
  function getSeasonAveragePoints() {
    const seasonAverage = entry.playerPoolEntry.player.stats.find(
      (stat) =>
        stat.scoringPeriodId === 0 &&
        stat.seasonId === seasonId &&
        stat.statSourceId === 0
    )?.appliedAverage;

    if (seasonAverage) {
      return seasonAverage.toFixed(2);
    }
    return "-";
  }
  const currentScoringPeriodPoints = getCurrentScoringPeriodPoints();
  const projectedPoints =
    currentScoringPeriodPoints
      .find((stat) => stat.statSourceId === 1)
      ?.appliedTotal.toFixed(2) ?? "-";
  const actualPoints =
    currentScoringPeriodPoints
      .find((stat) => stat.statSourceId === 0)
      ?.appliedTotal.toFixed(2) ?? "-";
  const seasonAverage = getSeasonAveragePoints() ?? "-";
  const { positionalRanking, totalRanking } = entry.playerPoolEntry.ratings[0];
  return (
    <tr>
      <td>{entry.playerPoolEntry.player.fullName} </td>
      <td>{projectedPoints} </td>
      <td>{actualPoints} </td>
      <td>{seasonAverage}</td>
      <td>{positionalRanking} </td>
      <td>{totalRanking}</td>
    </tr>
  );
}

export default Player;
