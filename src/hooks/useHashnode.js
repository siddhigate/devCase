import { useState } from "react";
import { useUserContext } from "../context/user-context";
import { getHashnodeBlogs } from "../services";

const useHashnode = (username) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useUserContext();

  const getBlogs = async (username) => {
    setIsPending(true);
    setError(null);

    const res = await getHashnodeBlogs(username);

    setIsPending(false);

    if (res.success) {
      dispatch({ type: "SET_HASHNODE", payload: { hashnode: username, articles: res  } });
    } else {
      dispatch({ type: "SET_HASHNODE", payload: { hashnode: null, articles: [] } });
      setError(res.error);
    }
  };
  return { isPending, error, getBlogs };
};

export default useHashnode;
