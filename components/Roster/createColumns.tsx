import { positionMap } from "@/constants";
import { Ratings, Entry, Stat } from "@/types/TeamDataResponse";
import { Column } from "../Table";
import { getOpponentName, TeamsMetadata } from "@/lib/utils";

export const createColumns = (
  scoringPeriodId: number | undefined,
  seasonId: number | undefined,
  teamsMetadata: TeamsMetadata
): Column<Entry>[] => {
  return [
    {
      header: "Player Name",
      accessor: "playerPoolEntry.player.fullName",
      className: "px-1 py-1",
    },
    {
      header: "Position",
      accessor: "playerPoolEntry.player.defaultPositionId",
      render: (value: number) => positionMap[value] ?? "-",
      className: "px-1 py-1",
    },
    {
      header: "Team",
      accessor: "playerPoolEntry.player.proTeamId",
      render: (value: number) => teamsMetadata[value].name,
      className: "px-1 py-1",
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
      className: "text-right px-1 py-1",
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
      className: "text-right px-1 py-1",
    },
    {
      header: "Opponent",
      accessor: "playerPoolEntry.player.proTeamId",
      render: (teamId: number) => {
        if (scoringPeriodId) {
          return getOpponentName(teamsMetadata, teamId, scoringPeriodId);
        }
        return "-";
      },
      className: "px-1 py-1",
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
      className: "text-right px-1 py-1",
    },
    {
      header: "Positional Ranking",
      accessor: "playerPoolEntry.ratings",
      render: (ratings: Ratings) => (
        <span className="text-right">
          {ratings[0]?.positionalRanking ?? "-"}
        </span>
      ),
      className: "text-right px-1 py-1",
    },
    {
      header: "Overall Ranking",
      accessor: "playerPoolEntry.ratings",
      render: (ratings: Ratings) => (
        <span className="text-right">{ratings[0]?.totalRanking ?? "-"}</span>
      ),
      className: "text-right px-1 py-1",
    },
  ];
};
