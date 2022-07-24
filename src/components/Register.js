import { useState } from "react";
import AuthForm from "./AuthForm";

function Register(props) {
  const { handleRegister } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister({
      email,
      password,
    });
  };

  return (
    <AuthForm
      formType="register"
      textOnBtn="Зарегистрироваться"
      onSubmit={handleSubmit}
      title="Регистрация"
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

export default Register;
