<<<<<<< HEAD
 
import { useEffect } from 'react';
import Landing from '../src/components/portfolio/Landing';
import Projects from '../src/components/projects/Projects';
import { useUserContext } from '../src/context/user-context'
import useGithub from '../src/hooks/useGitHub';
=======
import { useEffect } from "react";
import Landing from "../src/components/portfolio/Landing";
import { useUserContext } from "../src/context/user-context";
import useGithub from "../src/hooks/useGitHub";
import { useRouter } from "next/router";
>>>>>>> b36b5b6972d403ecc58e0f224e2ca70ac0773068

export default function Portfolio() {
  let { user } = useUserContext();

  const { getRepos } = useGithub();

  const router = useRouter();

  useEffect(() => {
    if (user.github) {
      getRepos(user.github.login);
    } else {
      router.push("/");
    }
  }, []);

<<<<<<< HEAD
    return (
        <>
            {user && <Landing user={user}/>}
            <Projects />
        </>
    )
}
=======
  return <>{user && user.github && <Landing user={user} />}</>;
}
>>>>>>> b36b5b6972d403ecc58e0f224e2ca70ac0773068
