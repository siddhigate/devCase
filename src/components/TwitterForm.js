import { useUserContext } from "../context/user-context";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import useTwitter from "../hooks/useTwitter";

export default function TwitterForm({ setTab }) {
  const [username, setUsername] = useState("");
  const [challenge, setChallenge] = useState("");
  const { isPending, error, getTwitterUser } = useTwitter();

  const handleNext = async (e) => {
    e.preventDefault();
    console.log("aaaaaaaaaaaaaaa",username);
    await getTwitterUser(username, challenge);
    setTab("hashnode");
  };

  const handleSkip = () => {
    setTab("hashnode");
  };

  return (
    <form onSubmit={handleNext}>
      <label>
        <span>enter your twitter handle name to continue:</span>
        <input
          type="text"
          placeholder="@twitter handle"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>
      <label>
        <span>select twitter challenge to continue:</span>
        <select
          onChange={(e) => setChallenge(e.target.value)}
          value={challenge}
        >
          <option value="30doc">30 days of code</option>
          <option value="151doc">151 days of code</option>
        </select>
      </label>
      
      <button type="submit">next</button>
      <button onClick={handleSkip}>skip</button>
      {isPending && <p>loading</p>}
      {error && <p>{error}</p>}
    </form>
  );
}
