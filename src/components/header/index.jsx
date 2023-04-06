import { Logo } from '../logo';
import { Profile } from '../profile';
import { SearchBar } from '../search';
import { AppBar, Box, Toolbar, Card, Button, Avatar } from '@mui/material';

import './styles.css';

export function Header({ handleSearchInputChange, handleSearchSubmit, user, onUpdateUser }) {

  const userAvatar = <Avatar src={user?.avatar} alt={""}/>;
  const toolbar = {
    width: 1150,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const handleClickButtonEdit = () => {
    onUpdateUser({ name: 'Вася', about: 'Ментор' })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ alignItems: 'center', background: 'white' }} component="nav">
        <Toolbar sx={toolbar}>
          <Logo/>
          <SearchBar handleInputChange={handleSearchInputChange} handleSubmit={handleSearchSubmit}/>
          <Card>
          <div>{userAvatar}</div>
          <div>{user?.name}: {user?.about}</div>
          <div>{user?.email}</div>
          <Button onClick={handleClickButtonEdit}>
          Изменить
          </Button>
          </Card>
          <Profile/>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}
