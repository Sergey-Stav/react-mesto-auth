import logoPath from "../images/Logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип" className="logo" />
    </header>
  );
}
export default Header;
