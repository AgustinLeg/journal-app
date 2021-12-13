import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeActive,
  startDeleting,
  startNewNote,
  startSaveNote,
} from "../../actions/notes";
import Dropdown from "./Dropdown";

const NotesAppBar = ({ imageModal }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { active } = useSelector((state) => state.notes);
  active = active || {id: null,category:'personal'}
  const [category, setCategory] = useState(active.category);
  const options = [
    { name: "personal", icon: "fa-user-alt" },
    { name: "school", icon: "fa-book-open" },
    { name: "design", icon: "fa-paint-brush" },
    { name: "other", icon: "fa-ellipsis-h" },
  ];
  const handleCreateEdit = () => {
    if (active?.id) {
      dispatch(startSaveNote({ ...active, category }));
      return;
    }
    const noteFirestore = { ...active, category };
    delete noteFirestore.id;
    dispatch(startNewNote(noteFirestore));
  };

  const handleCancelDelete = () => {
    if (active.id) {
      dispatch(startDeleting(active.id));
      return;
    }
    navigate("/");
  };

  const handleRemoveNote = () => {
    dispatch(removeActive());
  };

  return (
    <div className="notes__appbar">
      <Link to="/" onClick={handleRemoveNote} className="ml-2 btn btn-primary">
        Volver
      </Link>

      <Dropdown
        selected={category}
        setSelected={setCategory}
        options={options}
      />
      <div className="notes__actions-container">
        <button className="btn btn-secondary" onClick={handleCreateEdit}>
          <i className="fas fa-bookmark"></i>
          {active?.id ? "Guardar" : "Crear"}
        </button>
        <button className="btn btn-secondary mr-5" onClick={imageModal}>
          <i className="fas fa-image"></i>
          Imagen
        </button>
        <button className="btn btn-danger" onClick={handleCancelDelete}>
          <i className="fas fa-trash-alt"></i>
          {active?.id ? "Eliminar" : "Cancelar"}
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
