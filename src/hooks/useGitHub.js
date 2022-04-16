import { useState } from "react";
import { useUserContext } from "../context/user-context";
import { getGithubRepos, getGitHubUser } from "../services";

const useGithub = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useUserContext();

  const getUserInfo = async (username) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await getGitHubUser(username);

      setIsPending(false);
      console.log("Res", res);
      if (res.success) {
        console.log("Resss", res);
        dispatch({ type: "SET_GITHUB", payload: { github: res } });
      } else {
        setError(res);
        dispatch({ type: "SET_GITHUB", payload: { github: null } });
      }
    } catch (err) {
      setError(err);
      dispatch({ type: "SET_GITHUB", payload: { github: null } });
    }
  };

  const getRepos = async (username) => {
    setIsPending(true);
    setError(null);

    const res = await getGithubRepos(username);

    setIsPending(false);
    if (res.success) {
      dispatch({ type: "SET_REPOS", payload: { githubRepos: res.repos } });
    } else {
      dispatch({ type: "SET_REPOS", payload: [] });
      setError(res);
    }
  };
  return { isPending, error, getUserInfo, getRepos };
};

export default useGithub;
