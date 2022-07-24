import { Link } from "react-router-dom";

function AuthForm(props) {
  const { children, formType, textOnBtn, onSubmit, title } = props;
  return (
    <div className="auth">
      <h2 className="auth__title">{title}</h2>
      <form 
        className="auth__form" 
        name={formType} 
        onSubmit={onSubmit}>
        {children}
        <button 
          className="auth__save-button" 
          type="submit">
          {textOnBtn}
        </button>
      </form>
      {formType === 'register' && 
        <Link to='/sign-in' className="auth__link opacity">
          Уже зарегистрированы? Войти
        </Link>
        }
    </div>
  )
}

export default AuthForm;