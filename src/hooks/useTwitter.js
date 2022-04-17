import { useState } from "react";
import { useUserContext } from "../context/user-context";
import { getTwitterUserId } from "../services";

const useTwitter = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useUserContext();

  const getTwitterUser = async (username, challenge) => {
    setIsPending(true);
    setError(null);

    const res = await getTwitterUserId(username);

    setIsPending(false);

    if (res.success) {
      dispatch({ type: "SET_TWITTER", payload: { twitterId: res, twitterChallenge: challenge } });
    } else {
      dispatch({ type: "SET_TWITTER", payload: { twitterId: null, twitterChallenge: null } });
      setError(res.error);
    }

    setIsPending(false);
  };
  return { isPending, error, getTwitterUser };
};

export default useTwitter;
