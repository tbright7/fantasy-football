"use client";
import React from "react";
import { useLeagueDataContext } from "@/providers/LeagueDataProvider";

function TeamName() {
  const { team, leagueData } = useLeagueDataContext();
  console.log(leagueData);
  if (team) {
    return <div className="ml-8">{team.name}</div>;
  }
}

export default TeamName;
