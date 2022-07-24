import { Link, useLocation } from "react-router-dom";
import logoPath from "../images/Logo.svg";

function Header(props) {
  const { email, onSignOut } = props;

  const location = useLocation();

  return (
    <header className="header">
      <img src={logoPath} alt="Логотип" className="logo" />
      <div className="header__links">
        <p className="header__text header__user-email">
          {location.pathname === "/" ? email : ""}
        </p>
        <button className="header__text header__button opacity" onClick={onSignOut}>
          {location.pathname === "/" ? "Выйти" : ""}
        </button>
        <Link to="sign-in" className="header__text header__link opacity">
          {location.pathname === "/sign-up" ? "Войти" : ""}
        </Link>
        <Link to="sign-up" className="header__text header__link opacity">
          {location.pathname === "/sign-in" ? "Регистрация" : ""}
        </Link>
      </div>
    </header>
  );
}
export default Header;
