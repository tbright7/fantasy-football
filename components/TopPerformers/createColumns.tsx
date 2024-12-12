import { positionMap } from "@/constants";
import { Column } from "../Table";
import {
  TeamsMetadata,
  getOpponentName,
  getPlayerHeadshotUrl,
} from "@/lib/utils";
import { TeamsScheduleResponse } from "@/types/TeamsScheduleResponse";
import Image from "next/image";
import { BasePlayer, BasePlayerPoolEntry } from "@/types/common";

export const createColumns = (
  teamsMetadata: TeamsMetadata,
  scoringPeriodId: number,
  teamsSchedule: TeamsScheduleResponse
): Column<BasePlayerPoolEntry>[] => {
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
      accessor: "player.fullName",
    },
    {
      header: "Position",
      accessor: "player.defaultPositionId",
      render: (value: number) => positionMap[value] ?? "-",
    },
    {
      header: "Owner",
      accessor: "owner",
    },
    {
      header: "Score",
      accessor: "actualPoints",
      render: (value: number) => value.toFixed(2),
      className: "text-right",
    },
    {
      header: "Opponent",
      accessor: "player.proTeamId",
      render: (teamId: number) =>
        getOpponentName(teamsMetadata, teamId, scoringPeriodId - 1),
    },
  ];
};
