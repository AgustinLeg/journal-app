import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../Stateless/Spinner";
import JournalCategories from "./JournalCategories";

const JournalEntries = () => {
  const { notes, loading } = useSelector((state) => state.notes);
  return (
    <div className="journal__entries">
      <div className="journal__tabs mt-2">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {notes.length > 0 ? (
              <JournalCategories />
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

export default JournalEntries;
