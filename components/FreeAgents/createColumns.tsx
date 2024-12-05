import { PlayerElement } from "@/types";
import { positionMap } from "@/constants";
import { Column } from "../Table";
import { TeamsMetadata, getOpponentName } from "@/lib/utils";

export const createColumns = (
  teamsMetadata: TeamsMetadata,
  scoringPeriodId: number
): Column<PlayerElement>[] => {
  return [
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
      header: "Projected Score",
      accessor: "projectedPoints",
      render: (value: number) => value.toFixed(2),
      className: "text-right",
    },
    {
      header: "Actual Score",
      accessor: "actualPoints",
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
