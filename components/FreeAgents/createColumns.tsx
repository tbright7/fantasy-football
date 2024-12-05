import { PlayerElement } from "@/types";
import { positionMap } from "@/constants";
import { Column } from "../Table";
export const createColumns = (): Column<PlayerElement>[] => {
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
  ];
};
