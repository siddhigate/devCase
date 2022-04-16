import { useState } from "react";
import { getHashnodeBlogs } from "../services/api-services";

const useHashnode = (username) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async (username) => {
    setIsPending(true);
    setError(null);

    const res = await getHashnodeBlogs(username);

    setIsPending(false);

    if(res.success){
        setBlogs(res.articles)
    }
    else {
        setError(res.error)
    }

    
  };
  return { isPending, error, blogs, getBlogs };
};

export default useHashnode;
