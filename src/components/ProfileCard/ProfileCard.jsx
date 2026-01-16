import style from './ProfileCard.module.css';
import me from '../../assets/me.jpeg';

function ProfileCard() {
  return (
    <div className={style.profile}>
      <img src={me} alt='profile' />

      <h1>Dan</h1>
      <p>I love making site</p>
    </div>
  );
}

export default ProfileCard;
