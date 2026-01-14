import style from "./ProfileCard.module.css";

function ProfileCard() {
  return (
    <div className={style.profile}>
      <img
        src='https://media.tenor.com/Ivgi2AGHJIcAAAAM/el-rista-kek.gif'
        alt='profile'
      />

      <h1>Dan</h1>
      <p>I love making site</p>
    </div>
  );
}

export default ProfileCard;
