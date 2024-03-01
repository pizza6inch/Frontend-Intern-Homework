import React, { useState } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function MyModal() {
  const rootElement = document.getElementById("root");
  Modal.setAppElement(rootElement);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{ color: "red" }}>Hello</h2>
        <button type="button" onClick={closeModal}>
          close
        </button>
        <div>I am a modal</div>
      </Modal>
    </div>
  );
}

export default MyModal;
