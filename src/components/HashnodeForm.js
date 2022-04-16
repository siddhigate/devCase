import { useUserContext } from "../context/user-context";
import useGithub from "../hooks/useGitHub";
import { useState, useEffect } from "react";
import useHashnode from "../hooks/useHashnode";
import { useRouter } from "next/router";

export default function HashnodeForm() {
  const { user } = useUserContext();
  const [username, setUsername] = useState("");
  const { isPending, error, getBlogs } = useHashnode();

  const router = useRouter();

  const handleNext = async (e) => {
    e.preventDefault();
    console.log("here?")
    console.log(e.target.value)
    await getBlogs(username)
    router.push("/edit")
  };

  const handleSkip = () => {
    router.push("/edit");
  }


  return (
    <div>
    <form onSubmit={handleNext}>                
            <label>
                <span>enter your hashnode profile name to continue:</span>
                <input 
                    type='text'
                    placeholder="hashnode profile"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </label>      
                
            <button type="submit">next</button>
             
            {isPending && <p>loading</p>}
            {error && <p>{error}</p>}
      </form>
      <button onClick={handleSkip}>skip</button> </div>
  );
}
