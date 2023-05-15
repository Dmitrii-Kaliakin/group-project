import { PostList } from '../../components/post-list';
import { Spinner } from '../../components/spinner';
import { WelcomeCard } from '../../components/welcome-card';
import { PostsContext } from '../../contexts/post-context';
import { useContext } from 'react';
import { Pagination } from '@mui/material';
import { PaginationContext } from '../../contexts/pagination-context';

const POSTS_PER_PAGE = 12;

export function HomePostsPage() {

  const { currentPage, setCurrentPage } = useContext(PaginationContext) || 1;
  const { posts, isLoading } = useContext(PostsContext);
  const totalPages = Math.round(posts.length / POSTS_PER_PAGE);
  const slicedPosts = currentPage === totalPages
    ? posts.slice(currentPage * POSTS_PER_PAGE)
    : posts.slice(currentPage * POSTS_PER_PAGE, (currentPage + 1) * POSTS_PER_PAGE);

  const handleChange = (e, page) => {
    setCurrentPage(page - 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <WelcomeCard/>
      {isLoading
        ? <Spinner/>
        : <>
          <PostList posts={slicedPosts}/>
          <Pagination sx={{marginBottom: '20px'}}
                      count={totalPages}
                      variant="outlined"
                      page={currentPage + 1}
                      shape="rounded"
                      onChange={handleChange}/>
        </>
      }
    </>
  );
};
