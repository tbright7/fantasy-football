import React from "react";
import { Team } from "@/types/LeagueDataResponse";

function Logo({ userTeam }: { userTeam: Team }) {
  return <img src={userTeam?.logo} className="h-12" />;
}

export default Logo;
