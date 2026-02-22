import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router';

import style from './Homepage.module.css';
import PostCard from '../../components/PostCard/PostCard';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/post`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, [setPosts, API_URL]);

  if (posts.length === 0) return <h1 className={style.noPost}>Loading...</h1>;

  return (
    <div className={style.postWrapper}>
      {posts &&
        posts.map((post) => {
          return (
            <Fragment key={post.id}>
              <PostCard post={post}></PostCard>
              <div className={style.line}></div>
            </Fragment>
          );
        })}
    </div>
  );
}

export default HomePage;
