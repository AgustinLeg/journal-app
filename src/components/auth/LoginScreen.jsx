import React from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector((state) => state.ui);

  const [values, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (password.trim().length === 0) {
      dispatch(setError("password is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email is not valid"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <div className="auth__social-networks">
        <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google button"
            />
          </div>
          <p className="btn-text">Continuar con Google</p>
        </button>
        <span className="auth__text">Continuar con mi email</span>
      </div>
      <form onSubmit={handleLogin} className="auth__form">
        <input
          className="auth__input"
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
        />
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <button
          type="submit"
          className="btn btn-primary btn-block mt-5"
          disabled={loading}
        >
          Iniciar sesión
        </button>
      </form>
    </>
  );
};

export default LoginScreen;
