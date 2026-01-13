import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function CategoryPosts() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/blog/v1/category/" + categoryId, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, [categoryId]);

  return (
    <div>
      {posts &&
        posts.map((post) => {
          return (
            <div>
              <Link to={"/post/" + post.id}>{post.title}</Link>
            </div>
          );
        })}
    </div>
  );
}
export default CategoryPosts;
