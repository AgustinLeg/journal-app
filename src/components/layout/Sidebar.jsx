import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { newNote, removeActive } from "../../actions/notes";
import CollectionsList from "./CollectionsList";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleCreateNote = () => {
    dispatch(
      newNote({
        title: "",
        body: "",
        isFavorite: false,
        category:'personal'
      })
    );
  };

  const handleRemoveNote = () => {
    dispatch(removeActive());
  };
  const handleToggleNav = () => {
    document.querySelector(".layout__sidebar").classList.toggle("active");
    document.querySelector(".journal__main").classList.toggle("active");
  };
  return (
    <aside className="layout__sidebar">
      <div className="layout__sidebar-btn">
        <button className="btn" onClick={handleToggleNav}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <ul className="layout__main-menu">
        <li>
          <NavLink
            to="/create-note"
            className="layout__navbar-item"
            onClick={handleCreateNote}
          >
            <div className="icon bg-multicolor">
              <i className="fas fa-plus"></i>
            </div>
            <p>Crear Nota</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className="layout__navbar-item"
            onClick={handleRemoveNote}
          >
            <div className="icon">
              <i className="fas fa-columns"></i>
            </div>
            <p> Dashboard</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className="layout__navbar-item">
            <div className="icon">
              <i className="far fa-star"></i>
            </div>
            <p>Notas favoritas</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/images" className="layout__navbar-item">
            <div className="icon">
              <i className="fas fa-image"></i>
            </div>
            <p>Mis imagenes</p>
          </NavLink>
        </li>
      </ul>
      <CollectionsList />
    </aside>
  );
};

export default Sidebar;
