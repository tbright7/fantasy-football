import React from "react";
import { Team } from "@/types/LeagueDataResponse";

function Record({ userTeam }: { userTeam: Team }) {
  return (
    <p className="ms-2">
      ({userTeam?.record.overall.wins} - {userTeam?.record.overall.losses} -
      {userTeam?.record.overall.ties})
    </p>
  );
}

export default Record;
