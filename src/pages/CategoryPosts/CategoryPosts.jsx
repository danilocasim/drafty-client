import { useEffect, useState } from "react";
import { useParams } from "react-router";

function CategoryPosts() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/blog/v1/category/" + categoryId)
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, [categoryId]);

  return (
    <div>
      {posts &&
        posts.map((post) => {
          return <h1>{post.title}</h1>;
        })}
    </div>
  );
}
export default CategoryPosts;
