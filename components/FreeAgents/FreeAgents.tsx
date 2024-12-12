"use client";
import { FreeAgentDataResponse } from "@/types/FreeAgentDataResponse";
import { createColumns } from "./createColumns";
import { Table } from "../Table";
import Card from "../Card";
import { useState } from "react";
import Tabs from "./Tabs";
import { TeamsMetadata } from "@/lib/utils";
import { LeagueDataResponse } from "@/types/LeagueDataResponse";
import { TeamDataResponse } from "@/types/TeamDataResponse";
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

export function FreeAgents({
  freeAgentData,
  leagueData,
  teamsMetadata,
  teamData,
  teamsSchedule,
}: {
  freeAgentData: FreeAgentDataResponse;
  leagueData: LeagueDataResponse;
  teamsMetadata: TeamsMetadata;
  teamData: TeamDataResponse;
  teamsSchedule: TeamsScheduleResponse;
}) {
  const [activeTab, setActiveTab] = useState("overall");

  function getTopPlayers(positionId?: number) {
    if (!freeAgentData?.players) return [];
    if (positionId) {
      return freeAgentData.players
        .filter((player) => player.player.defaultPositionId === positionId)
        .slice(0, 10);
    }

    return freeAgentData.players.slice(0, 10);
  }

  const activePlayers =
    activeTab === "overall"
      ? getTopPlayers()
      : getTopPlayers(
          TAB_CATEGORIES.find((tab) => tab.id === activeTab)?.positionId
        );

  const columns = createColumns(
    teamsMetadata,
    leagueData.scoringPeriodId,
    teamData.positionGroupsByProjectedPoints,
    teamsSchedule
  );

  return (
    <Card header="Top Free Agents" collapsible className="overflow-auto">
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
