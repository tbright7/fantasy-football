import React from "react";
import { createColumns } from "./createColumns";
import { Table } from "../Table";
import { Card } from "../Card";
import { fetchLeagueData, fetchTeamData, fetchTeamsSchedule } from "@/lib/api";
import { getTeamMetadata } from "@/lib/utils";

export async function Roster() {
  const leagueData = await fetchLeagueData();
  const teamData = await fetchTeamData(leagueData.scoringPeriodId);
  const teamsSchedule = await fetchTeamsSchedule();
  const teamsMetadata = getTeamMetadata(teamsSchedule);

  const columns = createColumns(
    leagueData?.scoringPeriodId,
    leagueData?.seasonId,
    teamsMetadata,
    teamsSchedule
  );

  const cardHeader = "Your Roster";

  const startersLineupSlotIdMap = new Set([0, 1, 2, 3, 4, 6, 16, 17, 23]);
  const starters =
    teamData?.roster.entries
      .filter((entry) => startersLineupSlotIdMap.has(entry.lineupSlotId))
      .sort((a, b) => (a.lineupSlotId < b.lineupSlotId ? -1 : 1)) ?? [];
  const bench =
    teamData?.roster.entries.filter(
      (entry) => !startersLineupSlotIdMap.has(entry.lineupSlotId)
    ) ?? [];

  return (
    <Card header={cardHeader} collapsible>
      <Table
        data={[...starters, ...bench]}
        columns={columns}
        className="custom-table"
      />
    </Card>
  );
}
