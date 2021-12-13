import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import Spinner from "../Stateless/Spinner";
import JournalEntry from "./JournalEntry";

const JournalFavScreen = () => {
  const { notes, loading } = useSelector((state) => state.notes);
  const [favNotes, setFavNotes] = useState([])
  useEffect(() => {
    setFavNotes(notes.filter(note => note.isFavorite))
  }, [notes])
  return (
    <div className="container">
      <Header title='Notas Favoritas' />
      <div className="nothing__main-content">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {favNotes.length > 0 ? (
              <div className="nothing__fav-items">
                {favNotes.map((note) => (
                    <JournalEntry key={note.id} {...note} />
                ))}
              </div>
            ) : (
              <div className="journal__noEntries">
                <p>Parece que no tenes ninguna nota</p>
                <p>Comienza creando una!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JournalFavScreen;
