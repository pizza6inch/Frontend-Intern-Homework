import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Modal.css";
const customStyles = {
  content: {
    top: "25%",
    left: "25%",
    right: "auto",
    bottom: "auto",
    width: "50%",
    height: "50%",
    color: "black",
  },
};

function EditModal(props) {
  useEffect(() => {
    const rootElement = document.getElementById("root");
    Modal.setAppElement(rootElement);
  }, []);

  function closeModal() {
    props.setIsOpen(false);
  }

  async function changeIssue() {
    console.log("changeIssue");
    await fetch("http://localhost:4000/updateIssue", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        number: props.issue.number,
        title: document.querySelector(".title-input").value,
        body: document.querySelector(".content-input").value,
      },
    });
    closeModal();
    window.location.reload();
  }

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="title-wrapper">
          <h2>Title:</h2>
          <input className="title-input" type="text">
            {}
          </input>
        </div>
        <div className="content-wrapper">
          <h2>Content:</h2>
          <input className="content-input" type="text">
            {}
          </input>
        </div>
        <div className="button-wrapper">
          <button
            className="confirm-button"
            type="button"
            onClick={changeIssue}
          >
            Comfirm Change
          </button>
          <button className="cancel-button" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default EditModal;
