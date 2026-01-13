import { useParams } from "react-router";

function PostPage() {
  const { postId } = useParams();
  return <h1>Post: {postId}</h1>;
}
export default PostPage;
