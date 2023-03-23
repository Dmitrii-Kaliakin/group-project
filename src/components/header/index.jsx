import { Logo } from "../logo";
import { Profile } from '../profile';

import "./styles.css";

export function Header() {
  return (
    <>
      <header className="header">
        <div className="container header__wrapper">
          <Logo />
          <Profile />
        </div>
      </header>
    </>
  );
}
