import { Link } from "react-router";
import style from "./Navigation.module.css";
import { useState } from "react";
import burger from "../../assets/navbar.svg";
import search from "../../assets/search.svg";
import home from "../../assets/home.svg";

function Navigation() {
  const [openNav, setOpenNav] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  function toggleNav() {
    setOpenNav(!openNav);
  }

  function toggleSearch() {
    setOpenSearch(!openSearch);
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
        <Link to={"/login"}>Login</Link>
      </div>

      <div>
        <div className={style.relative}>
          <img onClick={toggleSearch} src={search} alt='search' />
          {openSearch && <input className={style.inputSearch} type='text' />}
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
              <Link to={"/login"}>Login</Link>
            </div>
          )}
        </div>

        <input type='text' className={style.search} />
      </div>
    </nav>
  );
}

export default Navigation;
