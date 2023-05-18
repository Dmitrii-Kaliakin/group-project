import { Button } from '@mui/material';
import { ReactComponent as NotFoundIcon } from './img/ic-notfound.svg';

import s from "./styles.module.css";
import { Link } from 'react-router-dom';
export function NotFound({ children, title, buttonText = "На главную" }) {

  return (
    <div className={s.notfound}>
      <NotFoundIcon className={s.image} aria-hidden="true" />
      <h1 className={s.title}>{title}</h1>
      {children && children}
      <Link to={{ pathname: '/' }}>
        <Button variant="contained" size={"large"} color= "secondary">{buttonText}</Button>
      </Link>
    </div>
  );
}