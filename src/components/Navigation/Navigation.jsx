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
    fetch("http://localhost:8000/blog/v1/post/search", {
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
        <h1>Blogs</h1>
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
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onChangeSearch(e.target.value);
              }}
              className={style.inputSearch}
              type='text'
            />
          )}
          <div className={style.searchOutput}>
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
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onChangeSearch(e.target.value);
            }}
            type='text'
            className={style.search}
          />
          {posts && (
            <div className={style.searchOutput}>
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
