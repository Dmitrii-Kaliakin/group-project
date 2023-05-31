import { Button, Card, CardContent, CardHeader, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export const WelcomeCard = () => {

  const location = useLocation();

  return <Container maxWidth={'lg'} sx={{ marginTop: '20px' }}>
    <Card>
      <CardHeader title={'Добро пожаловать'}/>
      <CardContent>
        <Link to="/post/new" replace state={{ backgroundLocation: location, initialPath: location.pathname }}>
          <Button>Создать пост</Button>
        </Link>
      </CardContent>
    </Card>
  </Container>;
};