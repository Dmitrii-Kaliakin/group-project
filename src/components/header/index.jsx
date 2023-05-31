import { Profile } from '../profile';
import { AppBar, Box, Toolbar } from '@mui/material';

export function Header({ children }) {

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
          {children}
          <Profile />
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}
