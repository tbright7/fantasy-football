import React from "react";
import { TopPerformers } from "./TopPerformers";
import {
  fetchLeagueData,
  fetchTeamsSchedule,
  fetchTopPerformers,
} from "@/lib/api";
import { getTeamMetadata } from "@/lib/utils/getTeamMetadata";

export async function TopPerformersWrapper() {
  const topPerformersData = await fetchTopPerformers();
  const leagueData = await fetchLeagueData();
  const teamsSchedule = await fetchTeamsSchedule();
  const teamsMetadata = getTeamMetadata(teamsSchedule);

  return (
    <TopPerformers
      topPerformersData={topPerformersData}
      leagueData={leagueData}
      teamsMetadata={teamsMetadata}
    />
  );
}
