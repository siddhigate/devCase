import { useUserContext } from "../context/user-context";
import useGithub from "../hooks/useGitHub";
import { useState, useEffect } from "react";

export default function GitHubForm({setTab}) {
  const { user } = useUserContext();
  const [username, setUsername] = useState("");
  const { isPending, error, getUserInfo} = useGithub();

  const handleNext = (e) => {
    e.preventDefault();
    console.log("herrrrrrrrreeeeeeeeeee");
    getUserInfo(username);
  };

  useEffect(() => {
    if(user.github) {
      setTab('twitter')
    }
  }, [user]);

  return (
    <form onSubmit={handleNext}>                
            <label>
                <span>Enter your GitHub username:</span>
                <input 
                    type='text'
                    placeholder="github profile"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </label>            
            {!isPending && <button className="button">next</button>}
            {isPending && <button className="button" disabled>loading</button>}
            {error && <p className="error">Could not find your profile :(  </p>}
        </form>
  );
}
