import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadImages = async (uid) => {
  const docRef = doc(db, `${uid}/images`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(doc(db, `${uid}/images`), { content: [] });
  }
  const data = docSnap.data() || [];
  const images = [];
  data.content?.forEach((url) => {
    images.push(url);
  });

  return images;
};
