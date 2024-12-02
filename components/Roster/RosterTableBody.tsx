"use client";
import React from "react";
import Player from "./Player";
import { LeagueDataResponse, RosterEntry } from "@/types";

function RosterTableBody({
  leagueData,
  starters,
  bench,
}: {
  leagueData: LeagueDataResponse | null;
  starters: RosterEntry[] | undefined;
  bench: RosterEntry[] | undefined;
}) {
  return (
    <tbody>
      {starters?.map((entry) => (
        <Player
          entry={entry}
          key={entry.playerId}
          scoringPeriodId={leagueData?.scoringPeriodId}
          seasonId={leagueData?.seasonId}
        />
      ))}
      {bench?.map((entry) => (
        <Player
          entry={entry}
          key={entry.playerId}
          scoringPeriodId={leagueData?.scoringPeriodId}
          seasonId={leagueData?.seasonId}
        />
      ))}
    </tbody>
  );
}

export default RosterTableBody;
