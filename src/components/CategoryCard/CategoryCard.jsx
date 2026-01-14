import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import style from "./CategoryCard.module.css";

function CategoryCard() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/blog/v1/category")
      .then((response) => response.json())
      .then((data) => setCategory(data.data));
  }, []);

  return (
    <div className={style.categoryCard}>
      <h1>Categories</h1>
      {category &&
        category.map((cat) => {
          return (
            <Link
              className={style.link}
              to={"/category/" + cat.id}
              key={cat.id}
            >
              <button>
                <p>{cat.name}</p> <div>{cat.posts.length}</div>
              </button>
            </Link>
          );
        })}
    </div>
  );
}

export default CategoryCard;
