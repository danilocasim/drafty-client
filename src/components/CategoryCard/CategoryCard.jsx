import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import style from './CategoryCard.module.css';

function CategoryCard() {
  const [category, setCategory] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/category`)
      .then((response) => response.json())
      .then((data) => setCategory(data.data));
  }, [API_URL]);

  return (
    <Fragment>
      {category && (
        <div className={style.categoryCard}>
          <h1>Categories</h1>
          {category.map((cat) => {
            return (
              <Link
                className={style.link}
                to={'/category/' + cat.id}
                key={cat.id}
              >
                <button>
                  <p>{cat.name}</p> <div>{cat.posts.length}</div>
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}

export default CategoryCard;
