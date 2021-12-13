import React from "react";

import NothingSelected from "./NothingSelected";
import Header from "../layout/Header";

const JournalScreen = () => {
  return (
    <div className="journal__main-content container">
      <Header />
      <NothingSelected />
    </div>
  );
};

export default JournalScreen;
