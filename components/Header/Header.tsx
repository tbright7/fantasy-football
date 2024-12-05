import React from "react";
import { fetchLeagueData } from "@/lib/api";
import Logo from "./Logo";
import TeamName from "./TeamName";
import Record from "./Record";

export async function Header() {
  // Fetch the data directly in the server component
  const leagueData = await fetchLeagueData();
  const userTeam = leagueData.userTeam;
  if (!leagueData.userTeam) {
    return (
      <header className="bg-gray-200 p-4 w-full flex items-center min-h-24">
        <div>Loading...</div>
      </header>
    );
  }

  // Render your header with data
  return (
    <header className="bg-gray-200 p-4 w-full flex items-center min-h-24">
      <Logo userTeam={userTeam} />
      <TeamName userTeam={userTeam} />
      <Record userTeam={userTeam} />
    </header>
  );
}
