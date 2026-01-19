import { Link } from 'react-router';
import style from './Navigation.module.css';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import burger from '../../assets/navbar.svg';
import search from '../../assets/search.svg';
import home from '../../assets/home.svg';
import { AuthContext } from '../../contexts/AuthContext';

function Navigation({
  setOpenSearch,
  searchInputRef,
  searchValue,
  setSearchValue,
  setPosts,
  posts,
  onChangeSearch,
  toggleSearch,
}) {
  const [openNav, setOpenNav] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const burgerRef = useRef(null);
  const navLinksRef = useRef(null);

  const searchIconRef = useRef(null);

  function toggleNav() {
    setOpenNav(!openNav);
  }

  const handleOutsideClick = useCallback(
    (e) => {
      if (
        (burgerRef.current &&
          !burgerRef.current.contains(e.target) &&
          navLinksRef.current &&
          !navLinksRef.current.contains(e.target)) ||
        (searchIconRef.current &&
          !searchIconRef.current.contains(e.target) &&
          searchInputRef.current &&
          !searchInputRef.current.contains(e.target))
      ) {
        setOpenNav(false);
        setOpenSearch(false);
        setPosts([]);
        setSearchValue('');
      }
    },
    [searchInputRef, setOpenSearch, setPosts, setSearchValue]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    console.log('RENDER');
    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <nav className={style.nav}>
      <div>
        <img
          src={home}
          alt='home icon
        '
        />
        <h1>
          <Link>Drafty</Link>
        </h1>
      </div>

      <div className={style.links}>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        {!user && <Link to={'/login'}>Login</Link>}
        {!user && <Link to={'/signup'}>Signup</Link>}
        {user && <button onClick={logout}>Logout</button>}
      </div>

      <div>
        <div className={style.relative}>
          <img
            ref={searchIconRef}
            onClick={() => {
              toggleSearch();
            }}
            src={search}
            alt='search'
          />
        </div>
        <div className={style.relative} ref={burgerRef}>
          <img
            onClick={toggleNav}
            className={style.burger}
            src={burger}
            alt='burger nav'
          />
          {openNav && (
            <div className={style.navLinks} ref={navLinksRef}>
              <Link to={'/'}>Home</Link>
              <Link to={'/about'}>About</Link>
              {!user && <Link to={'/login'}>Login</Link>}
              {!user && <Link to={'/signup'}>Signup</Link>}
              {user && <button onClick={logout}>Logout</button>}{' '}
            </div>
          )}
        </div>

        <div className={style.searchWrapper}>
          <div className={style.searchDiv}>
            <label htmlFor='search'>
              <img src={search} alt='search' />
            </label>
            <input
              id='search'
              value={searchValue}
              placeholder='Search'
              onChange={(e) => {
                setSearchValue(e.target.value);
                onChangeSearch(e.target.value);
              }}
              type='text'
              className={style.search}
            />
          </div>
          {posts && (
            <div
              className={posts.length !== 0 ? style.searchOutput : style.none}
            >
              {posts.map((post) => {
                return (
                  <Link
                    onClick={() => {
                      setSearchValue('');
                      setPosts([]);
                    }}
                    to={'/post/' + post.id}
                  >
                    {post.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
