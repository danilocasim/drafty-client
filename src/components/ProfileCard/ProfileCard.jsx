import style from "./ProfileCard.module.css";

function ProfileCard() {
  return (
    <div className={style.profile}>
      <img
        src='https://avatars.githubusercontent.com/u/116498474?v=4'
        alt='profile'
      />

      <h1>Danilo Casim Jr</h1>
      <p>I love making site</p>
    </div>
  );
}

export default ProfileCard;
