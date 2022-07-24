import { useState } from "react";
import AuthForm from './AuthForm';

function Login(props) {
  const { handleLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin({
      email,
      password,
    });
  };

  return (
    <AuthForm
      formNType="login"
      textOnBtn="Войти"
      onSubmit={handleSubmit}
      title="Вход"
    >
        <input
          className="auth__text"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeEmail}
        />
        <input
          className="auth__text"
          type="password"
          name="password"
          value={password}
          placeholder="Пароль"
          minLength="6"
          maxLength="40"
          required
          onChange={handleChangePassword}
        />
        </AuthForm>
  );
}

export default Login;