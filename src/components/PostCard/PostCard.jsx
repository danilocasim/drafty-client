import { Link } from "react-router";
import placeholder from "../../assets/placeholder.svg";
import calendar from "../../assets/calendar.svg";
import category from "../../assets/category.svg";
import style from "./PostCard.module.css";

function PostCard({ post }) {
  return (
    <div className={style.postCard}>
      <div>
        <h1>
          <Link to={"/post/" + post.id}>{post.title}</Link>
        </h1>
        <div className={style.details}>
          <div>
            <img src={calendar} alt='calendar' />
            <p>{post.createdAt}</p>
          </div>
          <div>
            <img src={category} alt='category' />
            <Link to={"/category/" + post.categoryId}>
              {post.category.name}
            </Link>
          </div>
        </div>
        <p>{post.description}</p>
      </div>
      <img src={placeholder} alt='placeholder' />
    </div>
  );
}

export default PostCard;
