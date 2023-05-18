import { useContext, useState, useEffect } from "react";
import { CardPost } from "../../components/card-post";
import { NotFound } from "../../components/not-found";
import { useParams } from "react-router-dom";
import { PostsContext } from "../../contexts/post-context";
import { Spinner } from "../../components/spinner";

export function PostPage() {
  const { productID } = useParams();
  const { posts, handlePostLike } = useContext(PostsContext);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postData = posts.find((post) => post._id === productID);

    if (postData) {
      setPost(postData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [posts]);

  function handlePagePostLike(post) {
    handlePostLike(post).then((updatePost) => {
      setPost(updatePost);
    });
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : post ? (
        <CardPost post={post} handlePagePostLike={handlePagePostLike} />
      ) : (
        <NotFound title="Страница не найдена" />
      )}
    </>
  );
}
