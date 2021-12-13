import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";
import { types } from "../types/types";
import { loadImages } from "../helpers/loadImages";

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    Swal.fire({
      title: "Cargando...",
      text: "Espera porfavor",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);

    const imagesRef = doc(db, `${uid}/images`);
    await updateDoc(imagesRef, {
      content: arrayUnion(fileUrl),
    });
    Swal.close();

    dispatch(addNewImage(fileUrl));

  };
};

export const addNewImage = (fileUrl) => ({
  type: types.imagesNew,
  payload: fileUrl,
});

export const startLoadingImages = (uid) => {
  return async (dispatch) => {
    const images = await loadImages(uid);
    dispatch(setImages(images));
  };
};

export const setImages = (images) => ({
  type: types.imagesLoad,
  payload: images,
});
