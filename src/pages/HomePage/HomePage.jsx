import { useEffect, useState } from "react";
import { Link } from "react-router";

import style from "./Homepage.module.css";
import PostCard from "../../components/PostCard/PostCard";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/blog/v1/post", {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, [setPosts]);

  return (
    <div className={style.postWrapper}>
      {posts &&
        posts.map((post) => {
          return (
            <>
              <PostCard post={post}></PostCard>
              <div className={style.line}></div>
            </>
          );
        })}
    </div>
  );
}

export default HomePage;
