"use client";
import React from "react";
import { useLeagueDataContext } from "@/providers/LeagueDataProvider";

function Logo() {
  const { team } = useLeagueDataContext();
  if (team) {
    return <img src={team.logo} className="h-16" />;
  }
}

export default Logo;
