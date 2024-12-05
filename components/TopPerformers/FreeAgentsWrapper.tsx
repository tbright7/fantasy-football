import React from "react";
import { FreeAgents } from "./FreeAgents";
import { fetchFreeAgentData } from "@/lib/api/fetchFreeAgentData";
import {
  fetchLeagueData,
  fetchTeamsSchedule,
  fetchTopPerformers,
} from "@/lib/api";
import { getTeamMetadata } from "@/lib/utils/getTeamMetadata";
export async function TopPerformers() {
  const freeAgentData = await fetchTopPerformers();
  const leagueData = await fetchLeagueData();
  const teamsSchedule = await fetchTeamsSchedule();
  const teamsMetadata = getTeamMetadata(teamsSchedule);
  return (
    <FreeAgents
      freeAgentData={freeAgentData}
      leagueData={leagueData}
      teamsMetadata={teamsMetadata}
    />
  );
}
