import { Link, Switch, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import logoPath from "../images/Logo.svg";

function Header(props) {
  const { email, onSignOut, loggedIn } = props;
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  function handleMenuOpen() {
   
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
    }
  }
  return (
    <header className={`header ${!loggedIn && "header_row-direction"}`}>
      <div className="header__menu-container">
        <img src={logoPath} alt="Логотип" className="logo" />
        <button
          onClick={handleMenuOpen}
          className={`header__menu-button opacity ${
            isMobileMenuOpen && "header__menu-button_type_opened"
          } ${!loggedIn && "header__menu-button_type_hidden"}`}
        ></button>
      </div>
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/">
          <div
            className={`header__email-container ${
              isMobileMenuOpen && "header__email-container_opened"
            }`}
          >
            <span className="header__email">{location.pathname === "/" ? email : ''}</span>
            <Link
              to="/signin"
              className="header__link header__link_exit"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
export default Header;
