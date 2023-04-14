import './styles.css';
import { Button, Card, CardContent, CardHeader, Container } from '@mui/material';
import { useContext } from 'react';
import { PostsContext } from '../../contexts/post-context';

export const WelcomeCard = () => {

  const { createPost } = useContext(PostsContext);

  return <Container maxWidth={'lg'} sx={{marginTop: '20px'}}>
    <Card>
      <CardHeader title={'Добро пожаловать'}/>
      <CardContent>
        <Button onClick={createPost}>Создать пост</Button>
      </CardContent>
    </Card>
  </Container>;
};