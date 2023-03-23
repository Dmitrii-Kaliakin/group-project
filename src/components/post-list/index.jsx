import './styles.css';
import { Container } from '@mui/material';
import { postData } from '../../posts';
import { Post } from '../post';

export const PostList = () => {

  const getPostElements = () => {
    if (!postData?.length) {
      return [];
    }

    return postData.map((post, index) => {
      return <Post key={post._id} text={post.text} author={post.author} img={post.image} tags={post.tags}/>;
    });
  };

  return <Container className={'post-list__container'} maxWidth={'lg'} sx={{ display: 'grid' }}>
    {postData?.length && getPostElements()}
  </Container>;
};