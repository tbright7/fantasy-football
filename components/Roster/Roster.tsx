"use client";

import React from "react";
import RosterTableHead from "./RosterTableHead";
import RosterTableBody from "./RosterTableBody";
import { useLeagueDataContext } from "@/providers";
import { useTeamData } from "@/hooks";
import SkeletonTable from "../SkeletonTable";

export function Roster() {
  const { teamId, leagueData, isLeagueDataLoading } = useLeagueDataContext();
  const { teamData, isTeamDataLoading } = useTeamData(teamId);
  const TableCard = ({ children }: { children: React.ReactNode }) => (
    <div className="block w-full max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow">
      {children}
    </div>
  );

  if (isTeamDataLoading || isLeagueDataLoading) {
    return (
      <TableCard>
        <SkeletonTable rows={17} columns={7} />
      </TableCard>
    );
  }

  const startersLineupSlotIdMap = new Set([0, 1, 2, 3, 4, 6, 16, 17, 23]);
  const starters = teamData?.roster.entries
    .filter((entry) => startersLineupSlotIdMap.has(entry.lineupSlotId))
    .sort((a, b) => (a.lineupSlotId < b.lineupSlotId ? -1 : 1));
  const bench = teamData?.roster.entries.filter(
    (entry) => !startersLineupSlotIdMap.has(entry.lineupSlotId)
  );

  return (
    <TableCard>
      <table className="border-separate border-spacing-2">
        <RosterTableHead />
        <RosterTableBody
          leagueData={leagueData}
          starters={starters}
          bench={bench}
        />
      </table>
    </TableCard>
  );
}
