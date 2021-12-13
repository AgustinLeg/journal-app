import { Routes, Route, Navigate } from "react-router-dom";

import JournalScreen from "../components/journal/JournalScreen";
import NoteScreen from "../components/notes/NoteScreen";
import Sidebar from '../components/layout/Sidebar'
import JournalFavScreen from "../components/journal/JournalFavScreen";
import ImagesScreen from "../components/images/ImagesScreen";

const JournalRouter = () => {
  return (
    <main className="journal__main">
      <Sidebar />
      <Routes>
        <Route path="/" element={<JournalScreen />} />
        <Route path="/:collection" element={<JournalScreen />} />
        <Route path="/create-note" element={<NoteScreen />} />
        <Route path="/note/:noteId" element={<NoteScreen />} />
        <Route path="/favorites" element={<JournalFavScreen />} />
        <Route path="/images" element={<ImagesScreen />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </main>
  );
};

export default JournalRouter;
