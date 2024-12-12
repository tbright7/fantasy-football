"use client";
import { LeagueDataResponse, Team } from "@/types/LeagueDataResponse";
import { createColumns } from "./createColumns";
import { Table } from "../Table";
import Card from "../Card";
import { useState } from "react";
import Tabs from "./Tabs";
import { TeamsMetadata } from "@/lib/utils/getTeamMetadata";
import { TopPerformersResponse } from "@/types/TopPerformersResponse";
import { BasePlayerPoolEntry } from "@/types/common";
import { TeamsScheduleResponse } from "@/types/TeamsScheduleResponse";

const TAB_CATEGORIES = [
  { label: "Top Overall", id: "overall" },
  { label: "Quarterbacks", id: "QB", positionId: 1 },
  { label: "Running Backs", id: "RB", positionId: 2 },
  { label: "Wide Receivers", id: "WR", positionId: 3 },
  { label: "Tight Ends", id: "TE", positionId: 4 },
  { label: "Kickers", id: "K", positionId: 5 },
  { label: "Defense/Special Teams", id: "DST", positionId: 16 },
];

export function TopPerformers({
  topPerformersData,
  leagueData,
  teamsMetadata,
  teamsSchedule,
}: {
  topPerformersData: TopPerformersResponse;
  leagueData: LeagueDataResponse;
  teamsMetadata: TeamsMetadata;
  teamsSchedule: TeamsScheduleResponse;
}) {
  const [activeTab, setActiveTab] = useState("overall");

  function getPoints(entry: BasePlayerPoolEntry, statSourceId: number) {
    const projectedStat = entry.player.stats.find(
      (stat) =>
        stat.scoringPeriodId === leagueData?.scoringPeriodId - 1 &&
        stat.statSourceId === statSourceId
    );
    return projectedStat ? projectedStat.appliedTotal : 0;
  }

  function getOwner(player: BasePlayerPoolEntry, teams: Team[]) {
    return (
      teams.find((team) => team.id === player.onTeamId)?.name ?? "Free Agent"
    );
  }

  function getTopPlayers(category: string, positionId?: number) {
    if (!topPerformersData?.players) return [];
    const players = topPerformersData.players.map((agent) => {
      return {
        ...agent,
        projectedPoints: getPoints(agent, 1),
        actualPoints: getPoints(agent, 0),
        owner: getOwner(agent, leagueData.teams),
      };
    });

    if (positionId) {
      return players
        .filter((player) => player.player.defaultPositionId === positionId)
        .slice(0, 10);
    }

    return players.slice(0, 10);
  }

  const activePlayers =
    activeTab === "overall"
      ? getTopPlayers("overall")
      : getTopPlayers(
          activeTab,
          TAB_CATEGORIES.find((tab) => tab.id === activeTab)?.positionId
        );

  const columns = createColumns(
    teamsMetadata,
    leagueData.scoringPeriodId,
    teamsSchedule
  );

  return (
    <Card
      header="Last Weeks Top Performers"
      collapsible
      className="overflow-auto"
    >
      <div className="">
        <div className="overflow-x-auto">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table data={activePlayers} columns={columns} />
      </div>
    </Card>
  );
}
