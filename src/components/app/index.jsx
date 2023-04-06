import { Header } from '../header';
import { Footer } from '../footer';
import './styles.css';
import { WelcomeCard } from '../welcome-card';
import { useEffect, useState } from 'react';
import { postApi } from '../../api/posts';
import { useDebounce } from '../../hooks/decompouse';
import { Spinner } from '../spinner';
import { PostList } from '../post-list';
import { styled } from '@mui/material';
import { SearchContext } from '../../contexts/search-context';

const StyledMainContainer = styled('main')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export function App() {

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const createPost = () => {
    console.log('Есть контакт');
  };

  useEffect(() => {
    postApi.getAll()
      .then(data => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    handleSearchRequest();
  }, [debouncedSearchQuery]);

  const handleSearchRequest = () => {
    setLoading(true);
    postApi.searchByQuery(debouncedSearchQuery)
      .then(data => setPosts(data))
      .finally(() => setLoading(false));
  };

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchRequest();
  };

  return (
    <>
      <SearchContext.Provider value={searchQuery}>
        <Header handleSearchInputChange={handleSearchInputChange} handleSearchSubmit={handleSearchSubmit}/>
        <StyledMainContainer>
          <WelcomeCard createPost={createPost}/>
          {isLoading ? <Spinner/> : <PostList posts={posts}/>}
        </StyledMainContainer>
        <Footer/>
      </SearchContext.Provider>
    </>
  );
}
