// In your setup page, ensure it's marked as a client-side component
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SetupPage = () => {
  const [espn_s2, setEspn_s2] = useState("");
  const [swid, setSwid] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    document.cookie = `espn_s2=${espn_s2}; path=/`;
    document.cookie = `swid=${swid}; path=/`;
    document.cookie = `leagueId=${leagueId}; path=/`;

    router.push("/dashboard");
  };

  return (
    <div>
      <h1>Setup Your Fantasy Football</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter espn_s2"
          value={espn_s2}
          onChange={(e) => setEspn_s2(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter swid"
          value={swid}
          onChange={(e) => setSwid(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter leagueId"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
        />
        <button type="submit">Save and Continue</button>
      </form>
    </div>
  );
};

export default SetupPage;
