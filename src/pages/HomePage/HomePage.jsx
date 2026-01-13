import { useContext, useEffect, useState } from "react";
import style from "./Homepage.module.css";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/blog/v1/post")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, [setPosts]);

  return (
    <div>
      {posts &&
        posts.map((post) => {
          return <h1>{post.title}</h1>;
        })}
    </div>
  );
}

export default HomePage;
