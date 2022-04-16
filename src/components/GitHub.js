import useGithub from "../hooks/useGithub";
import { useEffect, useState } from 'react'

export default function Github() {
    const [username, setUsername] = useState('')
    const {isPending, error, user,repos, getUserInfo, getRepos} = useGithub();
  
    const handleClick = async () => {
  
      // getBlogs(username);
  
      await getUserInfo(username);
  
      if(!error)
        getRepos(username)
    
    }
  
    useEffect(() => {
      console.log(repos)
    }, [repos])
  

  return (
    <div>
      
      <input type="text" onChange={e => setUsername(e.target.value)}></input>
      <button onClick={handleClick}>Click me</button>
      {isPending && <p>loading</p>}

      {error && <p>{error.statusText}{error.status}</p>}

      {user &&<div> <p>{user.name}</p> <img src={user.avatar_url} width="300" height="300"></img> <p>{user.bio}</p> </div>}
    </div>
  );
}
