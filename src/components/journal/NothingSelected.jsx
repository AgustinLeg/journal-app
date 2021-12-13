import React from "react";
import { useSelector } from "react-redux";
import JournalEntries from "./JournalEntries";
import astronaut from "../../assets/astronaut.svg";

const NothingSelected = () => {
  const { name } = useSelector((state) => state.auth);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date().toLocaleDateString("es-ES", options);
  return (
    <div className="container">
      <div className="nothing__main-content">
        <div className="nothing__welcome">
          <div className="nothing__welcome-info">
            <h3>Hola {name}</h3>
            <p>Que bueno verte por aca</p>
            <p>
              Hoy es <span>{date}</span>
            </p>
          </div>
          <div className="nothing__welcome-img">
            <img src={astronaut} alt="astronaut illustration" />
          </div>
        </div>
        <JournalEntries />
      </div>
    </div>
  );
};

export default NothingSelected;
