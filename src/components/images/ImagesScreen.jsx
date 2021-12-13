import React, { useState } from "react";
import Header from "../layout/Header";
import Images from "./Images";
import Modal from "react-modal";
Modal.setAppElement("#root");
const ImagesScreen = () => {
  const [imgURL, setImgURL] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(url) {
    setImgURL(url);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="journal__main-content container">
      <Header title={"Imágenes"} />
      <Images action={openModal} />
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="journal__modal"
          overlayClassName="journal__modal-overlay"
        >
          <div className="journal__modal-container">
            <img src={imgURL} alt="" />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ImagesScreen;
