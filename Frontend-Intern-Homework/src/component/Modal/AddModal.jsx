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

function AddModal(props) {
  useEffect(() => {
    const rootElement = document.getElementById("root");
    Modal.setAppElement(rootElement);
  }, []);

  function closeModal() {
    props.setIsOpen(false);
  }

  async function AddIssue() {
    if (document.querySelector(".title-input").value.length === 0) {
      alert("Title cannot be empty");
      return;
    }
    if (document.querySelector(".content-input").value.length < 30) {
      alert("Content cannot be less than 30 characters");
      return;
    }
    await fetch("http://localhost:4000/AddIssue", {
      //要改成新增的API
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
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
          <button className="confirm-button" type="button" onClick={AddIssue}>
            Confirm
          </button>
          <button className="cancel-button" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default AddModal;
