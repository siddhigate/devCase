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
    
  };

  const handleSkip = () => {
    router.push("/edit");
  }

  useEffect(() => {
    if(user.hashnode) {
      router.push("/edit")
    }
  }, [user])


  return (
    <div>
    <form onSubmit={handleNext}>                
            <label>
                <span>Enter your hashnode username: </span>
                <input 
                    type='text'
                    placeholder="hashnode username"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </label>      
                
            
            {!isPending && <button type="submit" className="button">Done</button>}
            {isPending && <button type="submit" className="button" disabled>loading</button>}
            {error && <p className="error">Couldn't fetch your profile :(</p>}
      </form>
      <button onClick={handleSkip} className="skip">skip</button> </div>
  );
}
