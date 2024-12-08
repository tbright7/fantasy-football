import { Player, PlayerPoolEntry } from "@/types/FreeAgentDataResponse";
import { positionMap } from "@/constants";
import { Column } from "../Table";
import { TeamsMetadata, getOpponentName } from "@/lib/utils";
import { Entry } from "@/types/TeamDataResponse";

export const createColumns = (
  teamsMetadata: TeamsMetadata,
  scoringPeriodId: number,
  sortedPointsByPosition: Record<number, Entry[]>
): Column<PlayerPoolEntry>[] => {
  return [
    {
      header: "Player Name",
      accessor: "player",
      render: (value: Player) => {
        const pointsByPositionGroup =
          sortedPointsByPosition[value.defaultPositionId] || [];

        if (pointsByPositionGroup.length === 0) {
          return <span>{value.fullName}</span>;
        }

        const validPlayers = pointsByPositionGroup.filter((player) => {
          const teamId = player?.playerPoolEntry?.player?.proTeamId ?? null;
          return !(
            teamId && teamsMetadata[teamId]?.byeWeek === scoringPeriodId
          );
        });

        const lowestPointsByPosition =
          validPlayers.length > 0
            ? validPlayers[validPlayers.length - 1]
            : pointsByPositionGroup[pointsByPositionGroup.length - 1];

        const isByeWeek =
          teamsMetadata[lowestPointsByPosition.playerPoolEntry.player.proTeamId]
            ?.byeWeek === scoringPeriodId;

        if (
          !isByeWeek &&
          (lowestPointsByPosition.projectedPoints ?? -Infinity) <
            (value?.projectedPoints ?? -Infinity)
        ) {
          return (
            <span className="font-bold text-green-700">{value.fullName}</span>
          );
        }

        return <span>{value.fullName}</span>;
      },
    },
    {
      header: "Position",
      accessor: "player.defaultPositionId",
      render: (value: number) => positionMap[value] ?? "-",
    },
    {
      header: "Projected Score",
      accessor: "player.projectedPoints",
      render: (value: number) => value.toFixed(2),
      className: "text-right",
    },
    {
      header: "Actual Score",
      accessor: "player.actualPoints",
      render: (value: number) => value.toFixed(2),
      className: "text-right",
    },
    {
      header: "Opponent",
      accessor: "player.proTeamId",
      render: (teamId: number) =>
        getOpponentName(teamsMetadata, teamId, scoringPeriodId),
    },
  ];
};
