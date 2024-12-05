import React from "react";
import { FreeAgents } from "./FreeAgents";
import { fetchFreeAgentData } from "@/lib/api/fetchFreeAgentData";
import { fetchLeagueData, fetchTeamData, fetchTeamsSchedule } from "@/lib/api";
import { getTeamMetadata } from "@/lib/utils/getTeamMetadata";
import { RosterEntry, Stat } from "@/types";
export async function FreeAgentsWrapper() {
  const freeAgentData = await fetchFreeAgentData();
  const leagueData = await fetchLeagueData();
  const teamsSchedule = await fetchTeamsSchedule();
  const teamsMetadata = getTeamMetadata(teamsSchedule);
  const teamData = await fetchTeamData();

  function getSortedPointsByPosition() {
    const map = {};

    function getPoints(player: RosterEntry) {
      const stats = player.playerPoolEntry.player.stats;
      return (
        stats
          .filter((stat) => stat.scoringPeriodId === leagueData.scoringPeriodId)
          .find((stat) => stat.statSourceId === 1)?.appliedTotal ?? 0
      );
    }
    teamData.roster.entries.forEach((entry) => {
      const positionId = entry.playerPoolEntry.player.defaultPositionId;
      entry["projectedPoints"] = getPoints(entry);
      if (map[positionId] === undefined) {
        map[positionId] = [entry];
      } else {
        map[positionId].push(entry);
      }
    });
    Object.values(map).forEach((position) =>
      position.sort((a, b) => (a.projectedPoints > b.projectedPoints ? -1 : 1))
    );
    return map;
  }

  return (
    <FreeAgents
      sortedPointsByPosition={getSortedPointsByPosition()}
      freeAgentData={freeAgentData}
      leagueData={leagueData}
      teamsMetadata={teamsMetadata}
    />
  );
}
