import { useUserContext } from "../context/user-context";
import useGithub from "../hooks/useGitHub";
import { useState, useEffect } from "react";

export default function GitHubForm({setTab}) {
  const { user } = useUserContext();
  const [username, setUsername] = useState("");
  const { isPending, error, getUserInfo} = useGithub();

  const handleNext = async (e) => {
    e.preventDefault();
    console.log("herrrrrrrrreeeeeeeeeee");
    await getUserInfo(username);
    setTab('twitter');
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <form onSubmit={handleNext}>                
            <label>
                <span>enter your github profile name to continue:</span>
                <input 
                    type='text'
                    placeholder="github profile"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </label>            
            <button>next</button>
            {isPending && <p>loading</p>}
            {error && <p>{error}</p>}
        </form>
  );
}
