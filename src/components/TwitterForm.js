import { useUserContext } from "../context/user-context";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import useTwitter from "../hooks/useTwitter";

export default function TwitterForm({ setTab }) {

  const {user} = useUserContext();
  const [username, setUsername] = useState("");
  const [challenge, setChallenge] = useState("");
  const { isPending, error, getTwitterUser } = useTwitter();

  const handleNext = async (e) => {
    e.preventDefault();
    console.log("aaaaaaaaaaaaaaa",username);
    await getTwitterUser(username, challenge);
    
  };

  useEffect(() => {
    if(user.twitterId) {
      setTab("hashnode");
    }
  }, [user])

  useEffect(() => {
    console.log(isPending)
  }, [isPending])

  const handleSkip = () => {
    setTab("hashnode");
  };

  return (
    <>
    <form onSubmit={handleNext}>
      <label>
        <span>Enter your twitter username:</span>
        <input
          type="text"
          placeholder="@twitter handle"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>
      <label>
        <span>Select twitter challenge: </span>
        <select
          onChange={(e) => setChallenge(e.target.value)}
          value={challenge}
        >
          <option value="30doc">30 days of code</option>
          <option value="151doc">151 days of code</option>
        </select>
      </label>
      
      {!isPending && <button type="submit" className="button">Next</button>}
      {isPending && <button type="submit" className="button" disabled>loading</button>}
      {error && <p className="error">Could not fetch your profile :(</p>}
    </form>
    <div className="flex-end"><button onClick={handleSkip} className="skip">skip</button></div>
    
    </>
  );
}
