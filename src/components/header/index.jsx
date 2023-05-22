import './styles.css';
import { Logo } from '../logo';
import { Profile } from '../profile';
import { SearchBar } from '../search';
import { AppBar, Box, Toolbar } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

export function Header() {

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
          <Routes>
            <Route path='*' element={<SearchBar/>}/>
          </Routes>
          <Profile />
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}
