import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import style from './PostPage.module.css';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useGetComments } from '../../hooks/useGetComments';
import Comment from '../../components/Comment/Comment.jsx';
import AddComment from '../../components/AddComment/AddComment';

function PostPage() {
  const { postId } = useParams();
  const { user, token } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

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
    fetch(`${API_URL}/post/public/` + postId, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => setPost(data.data));
  }, [postId, API_URL]);

  return (
    <div className={style.postWrapper}>
      {post && (
        <div className={style.post}>
          <div className={style.details}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.createdAt}</p>
            <p>Authored By: {post.User.username}</p>
          </div>

          <div
            className={style.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
            <p className={style.loginPop}>
              <Link to={'/login'}>Login now</Link> to see the comments
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PostPage;
