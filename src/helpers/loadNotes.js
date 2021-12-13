import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";


export const loadNotes = async (uid) => {
    const notesSnapshot = await getDocs(collection(db, `${uid}/journal/notes`));

    const notes = []
    notesSnapshot.forEach(note => {
        notes.push({
            id: note.id,
            ...note.data()
        })
    })

    return notes;
}