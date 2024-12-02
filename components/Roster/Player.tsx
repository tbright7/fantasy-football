import React from "react";
import { RosterEntry } from "@/types";
import { positionMap } from "@/constants";
function Player({
  entry,
  scoringPeriodId,
  seasonId,
}: {
  entry: RosterEntry;
  scoringPeriodId: number | undefined;
  seasonId: number | undefined;
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

  const defaultPosition =
    positionMap[entry.playerPoolEntry.player.defaultPositionId] ?? "-";
  return (
    <tr className="leading-4">
      <td className="px-4 py-0">{entry.playerPoolEntry.player.fullName}</td>
      <td className="px-4 py-0">{defaultPosition}</td>
      <td className="text-right px-4 py-0">{projectedPoints}</td>
      <td className="text-right px-4 py-0">{actualPoints}</td>
      <td className="text-right px-4 py-0">{seasonAverage}</td>
      <td className="text-right px-4 py-0">{positionalRanking}</td>
      <td className="text-right px-4 py-0">{totalRanking}</td>
    </tr>
  );
}

export default Player;
