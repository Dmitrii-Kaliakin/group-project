import { InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useRef } from 'react';
import { SearchContext } from '../../contexts/search-context';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '1px solid #e5e5e5',
  color: '#757575'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    minWidth: '500px',
  },
}));

const StyledInputContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  position: 'absolute',
  right: '5px',
  cursor: 'pointer',
}));

export const SearchBar = ({ handleInputChange, handleSubmit }) => {

  const searchInputRef = useRef(null);
  const resetSearchInput = () => {
    searchInputRef.current.querySelector('input').value = '';
    handleInputChange('');
  }

  const searchQuery = useContext(SearchContext);

  return <>
    <Search>
      <SearchIconWrapper>
        <SearchIcon/>
      </SearchIconWrapper>
      <form onSubmit={handleSubmit}>
        <StyledInputContainer>
          <StyledInputBase ref={searchInputRef}
                           placeholder="Search…"
                           onChange={(e) => handleInputChange(e.target.value?.toLowerCase())}/>
          {searchQuery && <StyledCloseIcon onClick={resetSearchInput}/>}
        </StyledInputContainer>
      </form>
    </Search>
  </>;
};