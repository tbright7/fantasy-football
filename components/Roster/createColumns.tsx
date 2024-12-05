import { positionMap } from "@/constants";
import { Ratings, RosterEntry, Stat } from "@/types";
import { Column } from "../Table";

export const createColumns = (
  scoringPeriodId: number | undefined,
  seasonId: number | undefined
): Column<RosterEntry>[] => {
  return [
    {
      header: "Player Name",
      accessor: "playerPoolEntry.player.fullName",
      // className: "px-0 py-0",
    },
    {
      header: "Position",
      accessor: "playerPoolEntry.player.defaultPositionId",
      render: (value: number) => positionMap[value] ?? "-",
      className: "px-0 py-0", // Fixed typo: changed `clasName` to `className`
    },
    {
      header: "Projected Score",
      accessor: "playerPoolEntry.player.stats",
      render: (stats: Stat[]) => {
        const projectedPoints =
          stats
            .filter((stat) => stat.scoringPeriodId === scoringPeriodId)
            .find((stat) => stat.statSourceId === 1)
            ?.appliedTotal?.toFixed(2) ?? "-";
        return projectedPoints;
      },
      className: "text-right px-0 py-0",
    },
    {
      header: "Actual Score",
      accessor: "playerPoolEntry.player.stats",
      render: (stats: Stat[]) => {
        const actualPoints =
          stats
            .filter((stat) => stat.scoringPeriodId === scoringPeriodId)
            .find((stat) => stat.statSourceId === 0)
            ?.appliedTotal?.toFixed(2) ?? "-";
        return <span className="text-right">{actualPoints}</span>;
      },
      className: "text-right px-0 py-0",
    },
    {
      header: "Average Score",
      accessor: "playerPoolEntry.player.stats",
      render: (stats: Stat[]) => {
        const seasonAverage =
          stats
            .find(
              (stat) =>
                stat.scoringPeriodId === 0 &&
                stat.seasonId === seasonId &&
                stat.statSourceId === 0
            )
            ?.appliedAverage?.toFixed(2) ?? "-";
        return <span className="text-right">{seasonAverage}</span>;
      },
      className: "text-right px-0 py-0",
    },
    {
      header: "Positional Ranking",
      accessor: "playerPoolEntry.ratings",
      render: (ratings: Ratings) => (
        <span className="text-right">
          {ratings[0]?.positionalRanking ?? "-"}
        </span>
      ),
      className: "text-right px-0 py-0",
    },
    {
      header: "Overall Ranking",
      accessor: "playerPoolEntry.ratings",
      render: (ratings: Ratings) => (
        <span className="text-right">{ratings[0]?.totalRanking ?? "-"}</span>
      ),
      className: "text-right",
    },
  ];
};
