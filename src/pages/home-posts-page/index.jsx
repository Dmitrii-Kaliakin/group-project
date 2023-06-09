import { PostList } from '../../components/post-list';
import { Spinner } from '../../components/spinner';
import { WelcomeCard } from '../../components/welcome-card';
import { PostsContext } from '../../contexts/post-context';
import { useContext } from 'react';
import { Pagination, styled } from '@mui/material';
import { PaginationContext } from '../../contexts/pagination-context';

const POSTS_PER_PAGE = 12;

const StyledPagination = styled(Pagination)(() => ({
  '& .MuiPagination-ul .Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
}));

export function HomePostsPage() {

  const { currentPage, setCurrentPage } = useContext(PaginationContext);
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
          <StyledPagination sx={{ marginBottom: '20px' }}
                            count={totalPages}
                            variant="outlined"
                            page={currentPage + 1}
                            shape="rounded"
                            onChange={handleChange}/>
        </>
      }
    </>
  );
}
