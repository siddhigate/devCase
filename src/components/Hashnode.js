import useHashnode from "../hooks/useHashnode";
import { useEffect, useState } from 'react'

export default function Hashnode() {
  const [username, setUsername] = useState();
  const { isPending, error, blogs, getBlogs } = useHashnode();

  const handleClick = () => {
      getBlogs(username)
  };

  return (
    <div>
      <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
      <button onClick={handleClick}>Click me</button>
      {isPending && <p>loading</p>}

      {error && (
        <p>
          {error.statusText}
          {error.status}
        </p>
      )}

      {blogs && blogs.map((blog) => <p>{blog.title}</p>)}
    </div>
  );
}
