import React from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { startRegisterEmailPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";

import { useForm } from "../../hooks/useForm";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [values, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = values;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email is not valid"));
      return false;
    } else if (password.length < 5 || password !== password2) {
      dispatch(
        setError(
          "password should be at least 6 characters and match each other"
        )
      );
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <form onSubmit={handleRegister} className="auth__form">
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          className="auth__input"
          type="password"
          name="password2"
          placeholder="Confirm password"
          value={password2}
          onChange={handleInputChange}
        />
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <button type="submit" className="btn btn-primary btn-block mt-5">
          Crear cuenta
        </button>
      </form>
    </>
  );
};

export default RegisterScreen;
