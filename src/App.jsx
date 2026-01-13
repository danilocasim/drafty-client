import { Outlet } from "react-router";
import Navigation from "./components/Navigation/Navigation";
import style from "./styles/App.module.css";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import CategoryCard from "./components/CategoryCard/CategoryCard";
function App() {
  return (
    <div className={style.container}>
      <Navigation></Navigation>
      <div className={style.wrapper}>
        <div className={style.sidebar}>
          <ProfileCard></ProfileCard>
          <CategoryCard></CategoryCard>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
