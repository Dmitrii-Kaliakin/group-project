import { Link } from "react-router-dom";
import logoSrc from "./assets/logo.svg";
import "./styles.css";

export function Logo() {
  return (
    <>
      <Link to={`/`} className="logo">
        <img src={logoSrc} alt="Логотип компании" className="logo__pic" />
        Group
        </Link>
    </>
  );
}
