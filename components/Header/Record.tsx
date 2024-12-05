import React from "react";
import { Team } from "@/types";

function Record({ userTeam }: { userTeam: Team }) {
  return (
    <sup>
      ({userTeam?.record.overall.wins} - {userTeam?.record.overall.losses} -
      {userTeam?.record.overall.ties})
    </sup>
  );
}

export default Record;
