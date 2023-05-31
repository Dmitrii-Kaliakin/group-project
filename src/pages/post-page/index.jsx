import { useContext, useEffect, useState } from 'react';
import { postApi } from '../../api/posts';
import { CardPost } from '../../components/card-post';
import { Spinner } from '../../components/spinner';
import { useParams } from 'react-router-dom';
import { PostsContext } from '../../contexts/post-context';
import { NotFound } from '../../components/not-found';

export function PostPage({ handleSearchRequest }) {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const { posts, handlePostLike, handleDeletePost } = useContext(PostsContext);

  function handlePagePostLike(post) {
    handlePostLike(post).then(updatePost => {
      setPost(updatePost);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    postApi.getById(postID)
      .then((postData) => {
        setPost(postData);
      })
      .catch((err) => {
        setErrorState(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [posts]);

  return (
    <>
      {isLoading
        ? <Spinner/>
        : !errorState && <CardPost
        handleSearchRequest={handleSearchRequest}
        post={post}
        handlePagePostLike={handlePagePostLike}
        handleDeletePost={handleDeletePost}/>
      }

      {!isLoading && errorState && <NotFound title="Пост не найден"/>}
    </>
  );
};