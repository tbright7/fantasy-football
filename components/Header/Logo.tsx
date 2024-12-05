import React from "react";
import { Team } from "@/types";

function Logo({ userTeam }: { userTeam: Team }) {
  return <img src={userTeam?.logo} className="h-16" />;
}

export default Logo;
