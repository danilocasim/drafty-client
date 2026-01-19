import { Link, Outlet, useNavigate } from 'react-router';
import Navigation from './components/Navigation/Navigation';
import style from './styles/App.module.css';
import ProfileCard from './components/ProfileCard/ProfileCard';
import CategoryCard from './components/CategoryCard/CategoryCard';
import { useLoginStatus } from './hooks/useLoginStatus';
import { AuthContext } from './contexts/AuthContext';
import { useRef, useState } from 'react';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [user, setUser] = useLoginStatus(token);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState([]);
  const searchInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;
  function toggleSearch() {
    if (!openSearch == false) {
      setPosts([]);
    }
    setOpenSearch(!openSearch);
  }

  function onChangeSearch(value) {
    fetch(`${API_URL}/post/search`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ title: value }),
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data);
      });
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }
  Link;
  return (
    <AuthContext value={{ user, token, logout }}>
      <div className={style.container}>
        <Navigation
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          setPosts={setPosts}
          posts={posts}
          onChangeSearch={onChangeSearch}
          searchInputRef={searchInputRef}
          toggleSearch={toggleSearch}
        ></Navigation>
        <div className={style.wrapper}>
          <div className={style.sidebar}>
            <ProfileCard></ProfileCard>
            <CategoryCard></CategoryCard>
          </div>
          <div className={style.content}>
            <div className={style.relative}>
              {openSearch && (
                <input
                  ref={searchInputRef}
                  placeholder='Search'
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    onChangeSearch(e.target.value);
                  }}
                  className={style.inputSearch}
                  type='text'
                />
              )}
              <div
                className={posts.length !== 0 ? style.searchOutput : style.none}
              >
                {posts.map((post) => {
                  return (
                    <Link
                      onClick={() => {
                        setSearchValue('');
                        setPosts([]);
                        toggleSearch();
                      }}
                      to={'/post/' + post.id}
                    >
                      {post.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </AuthContext>
  );
}

export default App;
