import { Link } from "react-router";
import style from "./Navigation.module.css";
import { useContext, useState } from "react";
import burger from "../../assets/navbar.svg";
import search from "../../assets/search.svg";
import home from "../../assets/home.svg";
import { AuthContext } from "../../contexts/AuthContext";

function Navigation() {
  const [openNav, setOpenNav] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);

  const { user, logout } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  function toggleNav() {
    setOpenNav(!openNav);
  }

  function toggleSearch() {
    if (!openSearch == false) {
      setPosts([]);
    }
    setOpenSearch(!openSearch);
  }

  function onChangeSearch(value) {
    fetch(`${API_URL}/post/search`, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ title: value }),
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data);
      });
  }

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
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        {!user && <Link to={"/login"}>Login</Link>}
        {!user && <Link to={"/signup"}>Signup</Link>}
        {user && <button onClick={logout}>Logout</button>}
      </div>

      <div>
        <div className={style.relative}>
          <img
            onClick={() => {
              toggleSearch();
            }}
            src={search}
            alt='search'
          />
          {openSearch && (
            <input
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
          <div className={posts.length !== 0 ? style.searchOutput : style.none}>
            {posts.map((post) => {
              return (
                <Link
                  onClick={() => {
                    setSearchValue("");
                    setPosts([]);
                    toggleSearch();
                  }}
                  to={"/post/" + post.id}
                >
                  {post.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={style.relative}>
          <img
            onClick={toggleNav}
            className={style.burger}
            src={burger}
            alt='burger nav'
          />
          {openNav && (
            <div className={style.navLinks}>
              <Link to={"/"}>Home</Link>
              <Link to={"/about"}>About</Link>
              {!user && <Link to={"/login"}>Login</Link>}
              {!user && <Link to={"/signup"}>Signup</Link>}
              {user && <button onClick={logout}>Logout</button>}{" "}
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
                      setSearchValue("");
                      setPosts([]);
                    }}
                    to={"/post/" + post.id}
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
