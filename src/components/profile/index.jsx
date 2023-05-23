import { Avatar, Button, Card } from '@mui/material';
import './styles.css';
import { UserContext } from '../../contexts/user-context';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';


export const Profile = () => {

  const user = useContext(UserContext);
  const userAvatar = <Avatar src={user?.avatar} alt={""}/>;
  const location = useLocation();

  return <div>
    <Card sx={{ display: 'flex', gap: '5px', alignItems: 'center', border: 'none', boxShadow: 'none' }}>
      <div>{userAvatar}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <div>{user?.name}</div>
          <div className={'profile__about'}>{user?.about}</div>
        </div>
        <div className={'profile__email'}>{user?.email}</div>
      </div>
      <Link to='/profile/edit' style= {{paddingLeft: "10px"}} replace state={{backgroundLocation: location, initialPath: location.pathname}}>
      <Button>
        Изменить
      </Button>
      </Link>
    </Card>
  </div>;
};