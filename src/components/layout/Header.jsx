import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

const Header = ({title = 'Journal App'}) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <header className="layout__header">
      <div className="layout__header-left">
        <h1 className="layout__header-title">{title}</h1>
      </div>
      <div className="layout__header-right">
        <ul className="nav-menu nav-center">
          <li>
            <div className="layout__user pointer">
              <h3 className="layout__header-item">
                <span className="layout__letter">
                  {name.charAt(0).toUpperCase()}
                </span>
                <span className="layout__user-name ml-1">{name}</span>
              </h3>
            </div>
            <ul>
              <li className="layout__nav-item pointer">
                <button className="btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt mr-1"></i>
                  Cerrar sesion
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
