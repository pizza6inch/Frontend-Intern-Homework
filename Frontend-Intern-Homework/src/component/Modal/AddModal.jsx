import React, { useEffect, useState } from "react"; // importing necessary modules
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
    color: "black", // styles for the modal
  },
};

function AddModal(props) {
  useEffect(() => { // component did mount
    const rootElement = document.getElementById("root");
    Modal.setAppElement(rootElement);
  }, []);

  function closeModal() {
    props.setIsOpen(false); // close the modal
  }

  async function AddIssue() {
    console.log("AddIssue");
    await fetch("http://localhost:4000/AddIssue", { // API call to add issue
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"), // Authorization token
        title: document.querySelector(".title-input").value, // getting title from input
        body: document.querySelector(".content-input").value, // getting content from input
      },
    });
    closeModal();
    window.location.reload(); // reload the page after adding issue
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
          <h2>Title:</h2> {/* label for title input */}
          <input className="title-input" type="text">
            {}
          </input> {/* input field for title */}
        </div>
        <div className="content-wrapper">
          <h2>Content:</h2> {/* label for content input */}
          <input className="content-input" type="text">
            {}
          </input> {/* input field for content */}
        </div>
        <div className="button-wrapper">
          <button className="confirm-button" type="button" onClick={AddIssue}>
            Confirm
          </button> {/* button to confirm adding issue */}
          <button className="cancel-button" type="button" onClick={closeModal}>
            Cancel
          </button> {/* button to cancel adding issue */}
        </div>
      </Modal>
    </>
  );
}

export default AddModal;
