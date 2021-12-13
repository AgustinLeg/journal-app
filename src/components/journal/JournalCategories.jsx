import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import JournalEntry from "./JournalEntry";

const JournalCategories = () => {
  const { collection } = useParams();
  const [collections, setCollections] = useState([]);
  const { notes } = useSelector((state) => state.notes);

  useEffect(() => {
    const allCollections = [
      { name: "personal", icon: "fa-user-alt" },
      { name: "school", icon: "fa-book-open" },
      { name: "design", icon: "fa-paint-brush" },
      { name: "other", icon: "fa-ellipsis-h" },
    ];
    const notesCollections = new Set(notes.map((note) => note.category));
    let resultCollections = [];
    if (collection) {
      resultCollections = [collection];
    } else {
      resultCollections = [...notesCollections];
    }
    setCollections(
      allCollections.filter((cat) => resultCollections.includes(cat.name))
    );
  }, [notes, collection]);

  const notesCollection = (name) => {
    let notesFiltered = [];
    if (collection) {
      notesFiltered = notes.filter((note) => note.category === collection);
      if (notesFiltered.length === 0) {
        return (
          <p className="journal__nothing-collection">
            No tienes ninguna nota en <span>{name}</span>, agrega una!
          </p>
        );
      }
    }
    return notes.map(
      (note) =>
        note.category === name && <JournalEntry key={note.id} {...note} />
    );
  };

  return (
    <>
      {collections.map(({ name, icon }) => (
        <div key={name} className="journal__tab">
          <input type="checkbox" id={`${name}Tab`} defaultChecked />
          <label className="journal__tab-label" htmlFor={`${name}Tab`}>
            <div className="title">
              <div className={`icon bg-${name}`}>
                <i className={`fas ${icon}`}></i>
              </div>
              {name}
            </div>
          </label>
          <div className="journal__tab-content">{notesCollection(name)}</div>
        </div>
      ))}
    </>
  );
};

export default JournalCategories;
