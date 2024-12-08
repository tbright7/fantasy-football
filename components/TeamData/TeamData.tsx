import { fetchLeagueData } from "@/lib/api";
import { getGame, getTeamSchedule } from "@/lib/utils";
import { cookies } from "next/headers";
import React from "react";
import Player from "./Player";
import Card from "../Card";
import Logo from "../Logo";
import TeamName from "../TeamName";
import Record from "../Record";
import Standings from "./Standings";

export async function TeamData() {
  const cookieStore = await cookies();
  const teamId = parseInt(cookieStore.get("teamId")?.value ?? "");

  const leagueData = await fetchLeagueData();
  const schedule = getTeamSchedule(leagueData.schedule, teamId);
  const currentGame = getGame(schedule, leagueData.scoringPeriodId);
  const previousGame = getGame(schedule, leagueData.scoringPeriodId - 1);
  return (
    <Card className="">
      <div className="w-full flex items-center">
        <Logo userTeam={leagueData.userTeam} />
        <TeamName userTeam={leagueData.userTeam} />
        <Record userTeam={leagueData.userTeam} />
      </div>
      {currentGame && (
        <Card className="" header="Current Matchup">
          <div className="flex flex-col gap-2">
            <Player leagueData={leagueData} game={currentGame.home} />
            <Player leagueData={leagueData} game={currentGame.away} />
          </div>
        </Card>
      )}
      {previousGame && (
        <Card className="" header="Previous Matchup">
          <div className="flex flex-col gap-2">
            <Player
              leagueData={leagueData}
              game={previousGame.home}
              historical
            />
            <Player
              leagueData={leagueData}
              game={previousGame.away}
              historical
            />
          </div>
        </Card>
      )}
      <Standings leagueData={leagueData} />
    </Card>
  );
}
