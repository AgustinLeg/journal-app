import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  activeNote,
  setFavorite,
  startDeleting,
  startSaveNote,
} from "../../actions/notes";

const JournalEntry = (note) => {
  const dispatch = useDispatch();
  const { id, date, title, body, url, isFavorite } = note;

  const fecha = new Date(date);
  const dayFormat = fecha.toLocaleDateString("es-ES", {
    day: "numeric",
    weekday: "long",
  });
  const monthFormat = fecha.toLocaleDateString("es-ES", { month: "long" });

  const handleFavorite = (e) => {
    e.preventDefault();

    dispatch(setFavorite(id, isFavorite));
    dispatch(startSaveNote({ ...note, isFavorite: !isFavorite}));
  };
  const handleEntryClick = (e) => {
    if (e.target.classList.contains("btn")) return;
    dispatch(
      activeNote(id, {
        ...note,
      })
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(startDeleting(id));
  };

  return (
    <Link to={`/note/${id}`} className="remove-link">
      <div className="journal__entry pointer" onClick={handleEntryClick}>
        {url && (
          <div
            className="journal__entry-picture"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${url})`,
            }}
          ></div>
        )}
        <div className="journal__entry-body">
          <div className="journal__entry-left">
            <p className="journal__entry-title">{title}</p>
            <p className="journal__entry-content">{body}</p>
          </div>
          <div className="journal__entry-date-box">
            <h4>{dayFormat}</h4>
            <span className="ml-1">de {monthFormat}</span>
          </div>
        </div>
        <div className="journal__entry-action">
          <button
            className={`btn journal__fav-item ${isFavorite ? "fav" : ""}`}
            onClick={handleFavorite}
          ></button>
          <button className="btn journal__trah-item" onClick={handleDelete}>
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default JournalEntry;
