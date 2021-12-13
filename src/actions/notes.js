import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "@firebase/firestore";
import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";

import { types } from "../types/types";

import { loadNotes } from "../helpers/loadNotes";
import { finishLoading, startLoading } from "./ui";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
})

export const newNote = (note) => ({
  type: types.notesNew,
  payload: { ...note },
});

export const setFavorite = (id, fav) => ({
  type: types.notesFav,
  payload: {
    id,
    fav,
  },
});

export const startNewNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      ...note,
      date: new Date().getTime(),
      isFavorite: false,
    };
    const docRef = await addDoc(
      collection(db, `${uid}/journal/notes`),
      newNote
    );

    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
  };
};
export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const stratLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startGetActiveNote = (id) => {
  return async(dispatch, getState) => {
    dispatch(startLoading())
    const uid = getState().auth.uid;
    const docRef = doc(db, `${uid}/journal/notes/${id}`);
    const docSnap = await getDoc(docRef);
    const note = docSnap.data()
    dispatch(activeNote(id,note))
    dispatch(finishLoading()) 
  };
}


export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});
export const removeActive = () => ({
  type: types.notesRemoveActive,
  payload: null,
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startSaveNote = (note) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
    updateDoc(noteRef, noteToFirestore)
      .then(() => {
       Toast.fire({
          icon: 'success',
          title: 'Guardado con exito'
        })
        dispatch(refreshNote(note.id, noteToFirestore));
      })
      .catch((err) =>
      Toast.fire("Error", "Ups hubo un error, intenta mas tarde", "error")
      );
     
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startDeleting = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#525252",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      backdrop: true,
      preConfirm: () => {
        return deleteDoc(doc(db, `${uid}/journal/notes/${id}`))
          .then(() => {
            dispatch(deleteNote(id));
            Toast.fire({
              icon: 'warning',
              title: 'Tarea eliminada con exito'
            })
          })
          .catch((error) => {
            Toast.showValidationMessage('danger',`Hubo un error, intenta mas tarde`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const notesLogout = () => ({
  type: types.notesLogoutCleaning,
});

