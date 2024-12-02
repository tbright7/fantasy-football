// In your setup page, ensure it's marked as a client-side component
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SetupPage = () => {
  const [espn_s2, setEspn_s2] = useState("");
  const [swid, setSwid] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save cookies on the client side
    document.cookie = `espn_s2=${espn_s2}; path=/`;
    document.cookie = `swid=${swid}; path=/`;
    document.cookie = `leagueId=${leagueId}; path=/`;
    document.cookie = `seasonId=${seasonId}; path=/`;

    try {
      // Send data to the server to create a JWT token
      const response = await fetch(
        `/api/auth/create-token?leagueId=${leagueId}&espn_s2=${espn_s2}&swid=${swid}&seasonId=${seasonId}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to create JWT token");
      }

      const { token } = await response.json();

      // Store the JWT token in a cookie (optional, you could also store it in localStorage)
      document.cookie = `authToken=${token}; path=/`;

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show a notification to the user)
    }
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
        <input
          id="year-picker"
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          placeholder="Enter year"
          value={seasonId}
          onChange={(e) => setSeasonId(e.target.value)}
        />
        <button type="submit">Save and Continue</button>
      </form>
    </div>
  );
};

export default SetupPage;
