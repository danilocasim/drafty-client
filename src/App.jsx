import { Link, Outlet } from "react-router";

function App() {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/signup"}>Signup</Link>
      <Link to={"/login"}>Login</Link>

      <Outlet></Outlet>
    </>
  );
}

export default App;
