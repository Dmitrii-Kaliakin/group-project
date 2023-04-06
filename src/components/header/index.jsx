import { Logo } from '../logo';
import { Profile } from '../profile';
import { SearchBar } from '../search';
import { AppBar, Avatar, Box, Toolbar } from '@mui/material';

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
    onUpdateUser({ name: 'Вася', about: 'Ментор' });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ alignItems: 'center', background: 'white' }} component="nav">
        <Toolbar sx={toolbar}>
          <Logo/>
          <SearchBar handleInputChange={handleSearchInputChange} handleSubmit={handleSearchSubmit}/>
          <Profile user={user} userAvatar={userAvatar} handleClick={handleClickButtonEdit}/>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}
