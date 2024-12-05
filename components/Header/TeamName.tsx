import React from "react";
import { Team } from "@/types";
function TeamName({ userTeam }: { userTeam: Team }) {
  return <div className="ml-8">{userTeam?.name}</div>;
}

export default TeamName;
