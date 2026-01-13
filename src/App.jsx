import { Outlet, useNavigate } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import style from "./styles/App.module.css";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import CategoryCard from "./components/CategoryCard/CategoryCard";
import { useLoginStatus } from "./hooks/useLoginStatus";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useLoginStatus(token);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext value={{ user, token, logout }}>
      <div className={style.container}>
        <Navigation></Navigation>
        <div className={style.wrapper}>
          <div className={style.sidebar}>
            <ProfileCard></ProfileCard>
            <CategoryCard></CategoryCard>
          </div>
          <div className={style.content}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </AuthContext>
  );
}

export default App;
