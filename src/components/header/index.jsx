import { Logo } from '../logo';
import { Profile } from '../profile';
import { SearchBar } from '../search';
import { AppBar, Box, Toolbar } from '@mui/material';

import './styles.css';

export function Header({ handleSearchInputChange, handleSearchSubmit }) {

  const toolbar = {
    width: 1150,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ alignItems: 'center', background: 'white' }} component="nav">
        <Toolbar sx={toolbar}>
          <Logo/>
          <SearchBar handleInputChange={handleSearchInputChange} handleSubmit={handleSearchSubmit}/>
          <Profile/>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}
