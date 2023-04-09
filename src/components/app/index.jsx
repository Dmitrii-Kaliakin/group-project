import { Header } from '../header';
import { Footer } from '../footer';
import './styles.css';
import { WelcomeCard } from '../welcome-card';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/decompouse';
import { Spinner } from '../spinner';
import { PostList } from '../post-list';
import { styled } from '@mui/material';
import { SearchContext } from '../../contexts/search-context';
import { postApi } from '../../api/posts';
import { userApi } from '../../api/user';
import { PostPage } from '../../pages/post-page';
import { HomePostsPage } from '../../pages/home-posts-page';
import { CardPost } from '../card-post';
import { Route, Routes } from 'react-router-dom';

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

  const createPost = () => {
    console.log('Есть контакт');
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
    postApi.changeLikePostStatus(post._id, isLiked)
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
          setIsLoading(false)
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

  return (
    <>
      <SearchContext.Provider value={searchQuery}>
        <Header
          user={currentUser}
          handleSearchInputChange={handleSearchInputChange}
          handleSearchSubmit={handleSearchSubmit}
          onUpdateUser={handleUpdateUser}/>
        <StyledMainContainer>
          <Routes>
            <Route path='/' element={<HomePostsPage isLoading={isLoading} createPost={createPost} posts={posts} handlePostLike={handlePostLike} currentUser={currentUser} handleDeletePost={handleDeletePost} />} />
            <Route path='/product/:productID' element={<PostPage />}/>
          </Routes>
        </StyledMainContainer >
        <Footer/>
      </SearchContext.Provider>
    </>
  );
}
