import React from "react";
// import { useLeagueDataContext } from "@/providers/LeagueDataProvider";
import Logo from "./Logo";
import TeamName from "./TeamName";
export function Header() {
  return (
    <header className="bg-gray-200 p-4 w-full flex items-center">
      <Logo />
      <TeamName />
    </header>
  );
}
