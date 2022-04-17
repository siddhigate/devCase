import { useEffect } from "react";
import Landing from "../src/components/portfolio/Landing";
import { useUserContext } from "../src/context/user-context";
import useGithub from "../src/hooks/useGitHub";
import { useRouter } from "next/router";
import Projects from "../src/components/projects/Projects";
import Blogs from "../src/components/portfolio/blogs/Blogs";
import Tweets from "../src/components/portfolio/tweets/Tweets";
import Footer from "../src/components/Footer";

export default function Portfolio() {
  let { user, dispatch } = useUserContext();

  const { getRepos } = useGithub();

  const router = useRouter();

  useEffect(() => {
    
    if (user.github) {
      getRepos(user.github.login);
    } else {
      router.push("/");
    }

    if(user.twitterId){
      const twitterAPIid = user.twitterId.data.id;
      fetch("/api/tweets", {
        method: "POST",
        body: JSON.stringify({ twitterId: twitterAPIid}),
      })
      .then(res => res.json())
      .then(data => dispatch({type: "SET_TWEETS", payload: {tweets: data}}))
      .catch(error => dispatch({type: "SET_TWEETS", payload: {tweets: null}}))
    }
  }, []);

  

  return (
    <div>
      {user && user.github && <Landing user={user} router={router} />}
      {user && user.github && <Projects />}
      {user && user.hashnode && <Blogs user={user}></Blogs>}
      {user && user.twitterId && <Tweets user={user}></Tweets>}
      {user && <Footer user={user}></Footer>}
    </div>
  );
}
