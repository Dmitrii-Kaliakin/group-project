import { Header } from '../header';
import { Footer } from '../footer';
import './styles.css';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import EditProfileInfo from '../edit-profile-info';
import { NewPost } from '../new-post';
import { EditPost } from '../edit-post';
import { PaginationContext } from '../../contexts/pagination-context';
import { Logo } from '../logo';
import { SearchBar } from '../search';

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
  const [currentPage, setCurrentPage] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;

  const initialPath = location.state?.initialPath;

  const onCloseRoutingModal = () => {
    navigate(initialPath || '/', { replace: true });
  };

  const createPost = (dataForm) => {
    postApi.createOne({ ...dataForm, isPublished: true }).then(data => {
      setPosts(prevState => [data, ...prevState]);
      onCloseRoutingModal();
    });
  };

  const updatePost = (dataUpdateForm) => {
    postApi.updateById(dataUpdateForm.id, { ...dataUpdateForm }).then(data => {
      setPosts(prevState => prevState.map(post => {
        if (post._id === dataUpdateForm.id) {
          return data;
        }
        return post;
      }));
      onCloseRoutingModal();
    });

  };

  const handleSearchRequest = () => {
    setIsLoading(true);
    postApi.searchByQuery(debouncedSearchQuery)
      .then(data => {
        setPosts(data);
        setCurrentPage(0);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchRequest();
  };

  const resetSearchBar = () => {
    handleSearchInputChange('');
    setTimeout(() => {
      headerRef.current.querySelector('.search-bar input').value = '';
    }, 0);
  };

  function handleUpdateUser(dataUserUpdate) {
    userApi.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer);
        onCloseRoutingModal();
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
    if (window.confirm('Подтвердите удаление поста')) {
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
        setCurrentPage(0);
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false); });
  }, []);

  const postContextDetails = useMemo(() => ({
    updatePost,
    posts,
    handlePostLike,
    createPost,
    handleDeletePost,
    isLoading,
  }), [posts]);

  const paginationContextDetails = useMemo(() => ({ currentPage, setCurrentPage }), [currentPage]);
  const searchContextDetails = useMemo(() => ({
    debouncedSearchQuery,
    handleSearchInputChange,
    handleSearchSubmit,
    handleUpdateUser,
    resetSearchBar,
  }), [debouncedSearchQuery]);

  return (
    <>
      <UserContext.Provider value={currentUser}>
        <PostsContext.Provider value={postContextDetails}>
          <SearchContext.Provider value={searchContextDetails}>
            <PaginationContext.Provider value={paginationContextDetails}>
              <div ref={headerRef}>
                <Header>
                  <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
                    <Route path='/' element={
                      <>
                        <Logo />
                        <SearchBar/>
                      </>
                    } />
                    <Route path='*' element={<Logo href="/" />} />
                  </Routes>
                </Header>
              </div>
              <StyledMainContainer>
                <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
                  <Route path="/" element={<HomePostsPage isLoading={isLoading} />} />
                  <Route path="/post/:postID" element={<PostPage handleSearchRequest={handleSearchRequest} />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </StyledMainContainer>
              <Footer />
              {backgroundLocation && <Routes>
                <Route path="/profile/edit" element={
                  <Modal isOpen onClose={onCloseRoutingModal}>
                    <EditProfileInfo onUpdateUser={handleUpdateUser} onClose={onCloseRoutingModal} />
                  </Modal>
                } />
                <Route path="/post/new" element={
                  <Modal isOpen onClose={onCloseRoutingModal}>
                    <NewPost onSubmit={createPost} onClose={onCloseRoutingModal} />
                  </Modal>
                } />

                <Route path="/post/edit/:id" element={
                  <Modal isOpen onClose={onCloseRoutingModal}>
                    <EditPost onSubmit={updatePost} onClose={onCloseRoutingModal} />
                  </Modal>
                } />
              </Routes>}
            </PaginationContext.Provider>
          </SearchContext.Provider>
        </PostsContext.Provider>
      </UserContext.Provider>
    </>
  );
}
