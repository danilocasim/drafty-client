import { useEffect, useState } from "react";
import { useParams } from "react-router";
import style from "./CategoryPosts.module.css";

import PostCard from "../../components/PostCard/PostCard";

function CategoryPosts() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/category/` + categoryId, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, [categoryId, API_URL]);

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
export default CategoryPosts;
