import { Header } from '../header';
import { Footer } from '../footer';
import './styles.css';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../hooks/decompouse';
import { styled } from '@mui/material';
import { SearchContext } from '../../contexts/search-context';
import { PostsContext } from '../../contexts/post-context';
import { postApi } from '../../api/posts';
import { userApi } from '../../api/user';
import { PostPage } from '../../pages/post-page';
import { HomePostsPage } from '../../pages/home-posts-page';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found-page';
import { UserContext } from '../../contexts/user-context';
import { Modal } from '../modal';
import { NewPost } from '../new-post';

const StyledMainContainer = styled('main')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export function App() {

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  const closeModal = () => {
    navigate(initialPath || '/', { replace: true });
  };

  const createPost = (dataForm) => {
    postApi.createOne({ ...dataForm, isPublished: true }).then(data => {
      setPosts(prevState => [data, ...prevState]);
      closeModal();
    });
  };

  const handleSearchRequest = () => {
    postApi.searchByQuery(debouncedSearchQuery)
      .then(data => setPosts(data));
  };

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchRequest();
  };

  function handleUpdateUser(dataUserUpdate) {
    userApi.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer);
      });
  }

  function handlePostLike(post) {
    const isLiked = post.likes.some(id => id === currentUser._id);
    return postApi.changeLikePostStatus(post._id, isLiked)
      .then((newPost) => {
        const newPosts = posts.map((p) => {

          return p._id === newPost._id ? newPost : p;
        });
        setPosts(newPosts);

        return newPost;

      });
  }

  const handleDeletePost = (post) => {
    if (window.confirm("Подтвердите удаление поста")) {
      setIsLoading(true);
      postApi.deleteById(post._id)
        .then(handleSearchRequest)
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    handleSearchRequest();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([postApi.getAll(), userApi.getCurrentUserInfo()])
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setPosts(postsData);
      })
      .catch(err => console.log(err))
      .finally(() => {setIsLoading(false);});
  }, []);

  const postContextDetails = useMemo(() => ({ posts, handlePostLike, createPost, handleDeletePost }), [posts]);

  return (
    <>
      <UserContext.Provider value={currentUser}>
        <PostsContext.Provider value={postContextDetails}>
          <SearchContext.Provider value={searchQuery}>
            <Header
              handleSearchInputChange={handleSearchInputChange}
              handleSearchSubmit={handleSearchSubmit}
              onUpdateUser={handleUpdateUser}/>
            <StyledMainContainer>
              <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
                <Route path='/' element={<HomePostsPage isLoading={isLoading}/>}/>
                <Route path='/product/:productID' element={<PostPage handleSearchRequest={handleSearchRequest}/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
              </Routes>
            </StyledMainContainer>
            <Footer/>
            {backgroundLocation && <Routes>
              <Route path='/post/new' element={
                <Modal isOpen onClose={closeModal}>
                  <NewPost onSubmit={createPost} onClose={closeModal}/>
                </Modal>
              }/>
            </Routes>}
          </SearchContext.Provider>
        </PostsContext.Provider>
      </UserContext.Provider>
    </>
  );
}
