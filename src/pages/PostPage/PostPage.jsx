import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import style from "./PostPage.module.css";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useGetComments } from "../../hooks/useGetComments";
import Comment from "../../components/Comment/Comment.jsx";
import AddComment from "../../components/AddComment/AddComment";

function PostPage() {
  const { postId } = useParams();
  const { user, token } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  const [newComment, setNewComment] = useState(null);
  const [updatedComment, setUpdatedComment] = useState(null);
  const [deletedComment, setDeletedComment] = useState(null);
  const [editing, setEditing] = useState(null);

  const [comments] = useGetComments(
    postId,
    token,
    deletedComment,
    updatedComment,
    newComment,
    editing
  );

  useEffect(() => {
    fetch("http://localhost:8000/blog/v1/post/public/" + postId, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => setPost(data.data));
  }, [postId]);

  console.log(post);

  return (
    <div className={style.post}>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>{post.createdAt}</p>
          <p>Authored By: {post.User.username}</p>

          <br />
          <br />

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <br />
          <br />
          {user && (
            <div className={style.commentsWrapper}>
              <h3>Responses</h3>
              <AddComment
                setNewComment={setNewComment}
                post={post}
                user={user}
                token={token}
              ></AddComment>

              <div className={style.comments}>
                {comments.map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      post={post}
                      updatedComment={updatedComment}
                      setUpdatedComment={setUpdatedComment}
                      setDeletedComment={setDeletedComment}
                      editing={editing}
                      setEditing={setEditing}
                    ></Comment>
                  );
                })}
              </div>
            </div>
          )}
          {!user && (
            <p>
              <Link to={"/login"}>Login now</Link> to see the comments
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PostPage;
