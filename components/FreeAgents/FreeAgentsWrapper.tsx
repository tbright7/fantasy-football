import React from "react";
import { FreeAgents } from "./FreeAgents";
import { fetchFreeAgentData } from "@/lib/api/fetchFreeAgentData";
import { fetchLeagueData } from "@/lib/api";
export async function FreeAgentsWrapper() {
  const freeAgentData = await fetchFreeAgentData();
  const leagueData = await fetchLeagueData();

  return <FreeAgents freeAgentData={freeAgentData} leagueData={leagueData} />;
}
