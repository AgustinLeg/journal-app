import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
  loading: true,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesNew:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notesFav:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            note.isFavorite = !note.isFavorite;
            return note;
          } else {
            return note;
          }
        }),
      };
    case types.notesLoad:
      return {
        ...state,
        loading: false,
        notes: [...action.payload],
      };
    case types.notesRemoveActive:
      return {
        ...state,
        active: null,
      };
    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
        loading: true,
        notes: [],
      };
    default:
      return state;
  }
};
