import React from "react";
import { NavLink } from "react-router-dom";

const CollectionsList = () => {
  return (
    <ul className="layout__collection-menu">
      <li>
        <div className="icon"></div>
        <p className="menu__title">Notas</p>
      </li>
      <li>
        <NavLink to="/personal" className="layout__navbar-item">
          <div className="icon bg-personal">
            <i className="fas fa-user-alt"></i>
          </div>
          <p className="ml-1">Personal</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/school" className="layout__navbar-item">
          <div className="icon bg-school">
            <i className="fas fa-book-open"></i>
          </div>
          <p className="ml-1">Escuela</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/design" className="layout__navbar-item">
          <div className="icon bg-design">
            <i className="fas fa-paint-brush"></i>
          </div>
          <p className="ml-1">Diseño</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/other" className="layout__navbar-item">
          <div className="icon bg-other">
            <i className="fas fa-ellipsis-h"></i>
          </div>
          <p className="ml-1">Otras</p>
        </NavLink>
      </li>
    </ul>
  );
};

export default CollectionsList;
