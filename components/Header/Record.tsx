"use client";
import React from "react";
import { useLeagueDataContext } from "@/providers/LeagueDataProvider";

function Record() {
  const { team } = useLeagueDataContext();
  if (team) {
    return (
      <sup>
        ({team.record.overall.wins} - {team.record.overall.losses} -
        {team.record.overall.ties})
      </sup>
    );
  }
}

export default Record;
