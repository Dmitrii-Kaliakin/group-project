import { Link } from 'react-router-dom';
import logoSrc from './assets/logo.svg';
import './styles.css';
import { useContext } from 'react';
import { SearchContext } from '../../contexts/search-context';

export function Logo() {

  const { resetSearchBar } = useContext(SearchContext);

  return (
    <>
      <Link to={`/`} className="logo" onClick={resetSearchBar}>
        <img src={logoSrc} alt="Логотип компании" className="logo__pic"/>
        Group
      </Link>
    </>
  );
}
