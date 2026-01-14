import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import style from "./Comment.module.css";

function Comment({
  comment,
  post,
  setUpdatedComment,
  updatedComment,
  setDeletedComment,
  editing,
  setEditing,
}) {
  const { token, user } = useContext(AuthContext);

  function onChangeUpdateComment(e) {
    setUpdatedComment(e.target.value);
  }

  function toggleEditComment(id, content) {
    if (id == editing) return setEditing(null);
    setEditing(id);

    setUpdatedComment(content);
  }

  function deleteComment(id) {
    fetch(`http://localhost:8000/blog/v1/post/${post.id}/comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "DELETE",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setDeletedComment(data.data);
      });
  }

  function editComment(id) {
    fetch(`http://localhost:8000/blog/v1/post/${post.id}/comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ content: updatedComment }),
    })
      .then((response) => response.json())
      .then(() => {
        setUpdatedComment("");
        setEditing(null);
      });
  }

  return (
    <div className={style.comment} key={comment.id}>
      <p>
        {comment.User.username} {post.userId == comment.userId && <i>Author</i>}
      </p>
      <div>
        <p> {comment.content}</p>
      </div>
      {editing == comment.id && (
        <div className={style.updateComment}>
          <input
            value={updatedComment}
            type='text'
            name='content'
            id='content'
            onChange={onChangeUpdateComment}
          />
          <button onClick={() => editComment(comment.id)}>Update</button>
        </div>
      )}
      <div className={style.editDeleteWrapper}>
        {comment.userId == user.id && (
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        )}
        {comment.userId == user.id && (
          <button
            onClick={() => {
              toggleEditComment(comment.id, comment.content);
            }}
          >
            {comment.id === editing && "Close"}
            {comment.id !== editing && "Edit"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
