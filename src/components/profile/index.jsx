import { Avatar, Button, Card } from '@mui/material';
import './styles.css';
import { UserContext } from '../../contexts/user-context';
import { useContext } from 'react';

export const Profile = ({ handleClick }) => {

  const user = useContext(UserContext);
  const userAvatar = <Avatar src={user?.avatar} alt={""}/>;

  return <div className={'profile'}>
    <Card sx={{ display: 'flex', gap: '5px', alignItems: 'center', border: 'none', boxShadow: 'none' }}>
      <div className={'profile__avatar'}>{userAvatar}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <div className={'profile__name'}>{user?.name}</div>
          <div className={'profile__about'}>{user?.about}</div>
        </div>
        <div className={'profile__email'}>{user?.email}</div>
      </div>
      <Button onClick={handleClick}>
        Изменить
      </Button>
    </Card>
  </div>;
};