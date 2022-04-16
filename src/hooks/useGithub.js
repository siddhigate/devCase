import { useState } from "react";
import { getGithubRepos, getGitHubUser } from "../services/api-services";

const useGithub = (username) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);

  const getUserInfo = async (username) => {
    setIsPending(true);
    setError(null);

    const res = await getGitHubUser(username);

    setIsPending(false);
    if (res.success) {
      setUser(res);
    } else {
      setError(res);
    }
  };

  const getRepos = async (username) => {
    setIsPending(true);
    setError(null);

    const res = await getGithubRepos(username);

    setIsPending(false);
    if (res.success) {
      setRepos(res.repos);
    } else {
      setError(res);
    }
  };
  return { isPending, error, user, repos, getUserInfo, getRepos };
};

export default useGithub;
