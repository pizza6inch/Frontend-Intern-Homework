import React, { useState } from "react";
import "./IssueForm.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function NewIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  async function handleSubmit() {
    // console.log("Title: ", title);
    // console.log("Description: ", description);
    if (title.length === 0) {
      alert("Title cannot be empty");
      return;
    }
    if (description.length < 30) {
      alert("description cannot be less than 30 characters");
      return;
    }
    await fetch("http://localhost:4000/AddIssue", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        body: JSON.stringify({ title, body: description }),
      },
    });
    window.location.href = "http://localhost:5173/home";
  }

  function handleTogglePreview(status) {
    if (status === "write") {
      setShowPreview(false);
    } else {
      setShowPreview(true);
    }
  }

  return (
    <div className="IssueForm">
      <div className="Issue-Box">
        <h2>Add a title</h2>
        <div className="Title-Box">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <h2>Add a description</h2>
        <div className="Description-Box">
          <div className="ViewButtonWrapper">
            <button type="button" onClick={() => handleTogglePreview("write")}>
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleTogglePreview("Preview")}
            >
              Preview
            </button>
          </div>
          {!showPreview && (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          )}
        </div>
        {showPreview && (
          <div className="Preview">
            <Markdown remarkPlugins={remarkGfm}>{description}</Markdown>
          </div>
        )}
        <div className="ButtonWrapper">
          <button className="Submit-Button" onClick={handleSubmit}>
            Submit new issue
          </button>
          <button
            className="Cancel-Button"
            onClick={() => {
              window.location.href = "http://localhost:5173/home";
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewIssue;
