import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import NotesAppBar from "./NotesAppBar";
import { useForm } from "../../hooks/useForm";
import { activeNote, startGetActiveNote } from "../../actions/notes";

import Modal from "react-modal";
import Images from "../images/Images";
import Spinner from "../Stateless/Spinner";
import { useParams } from "react-router-dom";

const NoteScreen = () => {
  const dispatch = useDispatch();
  const {
    notes: { notes, active: note },
    ui: { loading },
  } = useSelector((state) => state);
  const initialState = note || {
    title: "",
    body: "",
    isFavorite: false,
  };
  const [values, handleInputChange, reset] = useForm(initialState);
  const { body, title } = values;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [imgURL, setImgURL] = useState(note?.url || null);

  const { noteId } = useParams();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const activeId = useRef(note?.id);

  useEffect(() => {
    if (note && note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(values.id, { ...values,url:imgURL}));
  }, [values, dispatch,imgURL]);

  useEffect(() => {
    if (notes.length === 0 && noteId) {
      dispatch(startGetActiveNote(noteId));
    }
  }, [noteId, dispatch, notes]);
  const handleAddImage = (url) => {
    setImgURL(url);
    closeModal();
  };
  return (
    <div className="notes__main-content">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <NotesAppBar imageModal={openModal} />
          {imgURL && (
            <div
              className={`notes__img-container ${imgURL ? "active" : ""}`}
              onClick={openModal}
              style={{ backgroundImage: `url(${imgURL})` }}
            >
              <i className="far fa-image"></i>
            </div>
          )}
          <div className="notes__content">
            <input
              type="text"
              placeholder="Some awesome title"
              className="notes__title-input"
              autoComplete="off"
              name="title"
              value={title}
              onChange={handleInputChange}
            />

            <textarea
              placeholder="What happened today"
              className="notes__textarea"
              name="body"
              value={body}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="journal__modal"
        overlayClassName="journal__modal-overlay"
      >
        <div className="journal__modal-container">
          <Images action={handleAddImage} />
        </div>
      </Modal>
    </div>
  );
};

export default NoteScreen;
