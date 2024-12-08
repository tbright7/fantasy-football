import React from "react";
import { Team } from "@/types/LeagueDataResponse";
function TeamName({ userTeam }: { userTeam: Team }) {
  return <p className="ml-8">{userTeam?.name}</p>;
}

export default TeamName;
