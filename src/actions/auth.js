import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { auth, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { notesLogout } from "./notes";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));

        dispatch(finishLoading());
      })
      
      .catch((error) => {
        dispatch(finishLoading());
        Swal.fire("Error", error.code, "error");
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(finishLoading());
        dispatch(login(user.uid, user.displayName));
      })
      .catch(error => {
        dispatch(finishLoading());
        Swal.fire("Error", error.message, "error");
      })
  };
};

export const startRegisterEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName: name,
        });
        dispatch(login(user.uid, user.displayName));
      })
      .catch( error => {
        Swal.fire("Error", error.message, "error");
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(logout());
    dispatch(notesLogout())
  };
};

export const logout = () => ({
  type: types.logout,
});
