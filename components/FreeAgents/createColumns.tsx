import { PlayerElement, RosterEntry } from "@/types";
import { positionMap } from "@/constants";
import { Column } from "../Table";
import { TeamsMetadata, getOpponentName } from "@/lib/utils";

export const createColumns = (
  teamsMetadata: TeamsMetadata,
  scoringPeriodId: number,
  sortedPointsByPosition: Record<number, RosterEntry[]>
): Column<PlayerElement>[] => {
  return [
    {
      header: "Player Name",
      accessor: "player",
      render: (value: FreeAgent) => {
        const pointsByPositionGroup =
          sortedPointsByPosition[value.defaultPositionId] || [];

        if (pointsByPositionGroup.length === 0) {
          // No players in the position group; just return the free agent's name
          return <span>{value.fullName}</span>;
        }

        // Filter out players on bye weeks
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
          lowestPointsByPosition.projectedPoints < value.projectedPoints
        ) {
          console.log(value.fullName);
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
      className: "text-right",
    },
  ];
};
