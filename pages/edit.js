import { useEffect } from "react";
import Landing from "../src/components/portfolio/Landing";
import { useUserContext } from "../src/context/user-context";
import useGithub from "../src/hooks/useGitHub";
import { useRouter } from "next/router";
import Projects from "../src/components/projects/Projects";
import Blogs from "../src/components/portfolio/blogs/Blogs";

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

  return (
    <div>
      {user && user.github && <Landing user={user} />}
      {user && user.github && <Projects />}
      {user && user.hashnode && <Blogs user={user}></Blogs>}
    </div>
  );
}
