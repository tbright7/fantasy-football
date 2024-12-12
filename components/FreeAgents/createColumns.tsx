import { FreeAgentPlayer } from "@/types/FreeAgentDataResponse";
import { positionMap } from "@/constants";
import { Column } from "../Table";
import {
  TeamsMetadata,
  getOpponentName,
  getPlayerHeadshotUrl,
} from "@/lib/utils";
import { Entry, BasePlayer } from "@/types/common";
import Image from "next/image";
import { TeamsScheduleResponse } from "@/types/TeamsScheduleResponse";

export const createColumns = (
  teamsMetadata: TeamsMetadata,
  scoringPeriodId: number,
  sortedPointsByPosition: Record<number, Entry[]>,
  teamsSchedule: TeamsScheduleResponse
): Column<FreeAgentPlayer>[] => {
  return [
    {
      header: "",
      accessor: "player",
      render: (value: BasePlayer) => {
        const defaultDefensivePositionId = 16;
        const isDefense =
          value.defaultPositionId === defaultDefensivePositionId;
        let teamAbr = undefined;

        if (isDefense) {
          teamAbr = teamsSchedule.settings.proTeams.find(
            (team) => team.id === value.proTeamId
          )?.abbrev;
        }
        const playerHeadshotUrl = getPlayerHeadshotUrl(
          isDefense,
          value.id,
          teamAbr
        );
        return (
          <div className="h-12 w-12">
            <Image
              src={playerHeadshotUrl}
              alt="Player or Team Logo"
              width={12}
              height={12}
              layout="responsive"
              unoptimized
            />
          </div>
        );
      },
    },
    {
      header: "Player Name",
      accessor: "player",
      render: (value: BasePlayer) => {
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
          (lowestPointsByPosition.playerPoolEntry.player.projectedPoints ??
            -Infinity) < (value?.projectedPoints ?? -Infinity)
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
      accessor: "player",
      render: (value: BasePlayer) => value?.projectedPoints?.toFixed(2),
      className: "text-right",
    },
    {
      header: "Actual Score",
      accessor: "player",
      render: (value: BasePlayer) => value?.actualPoints?.toFixed(2),
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
