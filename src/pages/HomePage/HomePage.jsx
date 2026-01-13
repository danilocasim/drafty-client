import { useEffect, useState } from "react";
import { Link } from "react-router";

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

export default HomePage;
