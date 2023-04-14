import './styles.css';
import { Logo } from '../logo';
import { Profile } from '../profile';
import { SearchBar } from '../search';
import { AppBar, Avatar, Box, Toolbar } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';

export function Header({ handleSearchInputChange, handleSearchSubmit, user, onUpdateUser }) {

  const userAvatar = <Avatar src={user?.avatar} alt={""}/>;
  const toolbar = {
    width: 1150,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const handleClickButtonEdit = () => {
    onUpdateUser({ name: "Алексей Безмощук", about: "Писатель" });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ alignItems: 'center', background: 'white' }} component="nav">
        <Toolbar sx={toolbar}>
            <Logo />
          <Routes>
             <Route path='/' element={<SearchBar handleInputChange={handleSearchInputChange} handleSubmit={handleSearchSubmit}/>} />
             <Route path='*' element={null} />
          </Routes>
          <Profile user={user} userAvatar={userAvatar} handleClick={handleClickButtonEdit}/>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}
