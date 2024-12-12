import { positionMap } from "@/constants";
import { Ratings, Entry, Stat, BasePlayer } from "@/types/common";
import { Column } from "../Table";
import {
  getOpponentName,
  getPlayerHeadshotUrl,
  TeamsMetadata,
} from "@/lib/utils";
import { TeamsScheduleResponse } from "@/types/TeamsScheduleResponse";
import Image from "next/image";

export const createColumns = (
  scoringPeriodId: number | undefined,
  seasonId: number | undefined,
  teamsMetadata: TeamsMetadata,
  teamsSchedule: TeamsScheduleResponse
): Column<Entry>[] => {
  return [
    {
      header: "",
      accessor: "playerPoolEntry.player",
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
      accessor: "playerPoolEntry.player",
      render: (value: BasePlayer) => value?.projectedPoints?.toFixed(2),
      className: "text-right px-1 py-1",
    },
    {
      header: "Actual Score",
      accessor: "playerPoolEntry.player",
      render: (value: BasePlayer) => value?.actualPoints?.toFixed(2),

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
