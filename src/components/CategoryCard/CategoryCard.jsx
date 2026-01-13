import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";

function CategoryCard() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/blog/v1/category")
      .then((response) => response.json())
      .then((data) => setCategory(data.data));
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {category &&
        category.map((cat) => {
          return (
            <div>
              <Link to={"/category/" + cat.id}>{cat.name}</Link>
              <div>{cat.posts.length}</div>
            </div>
          );
        })}
    </div>
  );
}

export default CategoryCard;
