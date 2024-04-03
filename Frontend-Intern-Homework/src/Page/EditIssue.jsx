import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchIssue, updateIssue } from "../api";

function EditIssue() {
  const [Issue, setIssue] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const IssueNumber = new URLSearchParams(window.location.search).get(
    "IssueNumber"
  );
  useEffect(() => {
    if (Issue === undefined) {
      fetchIssue(IssueNumber).then((data) => {
        setIssue(data);
      });
    }
  }, []);

  useEffect(() => {
    if (Issue !== undefined) {
      setTitle(Issue.title);
      setDescription(Issue.body);
    }
  }, [Issue]);

  async function handleSubmit() {
    if (title.length === 0) {
      alert("Title cannot be empty");
      return;
    }
    if (description.length < 30) {
      alert("description cannot be less than 30 characters");
      return;
    }
    updateIssue(title, description, IssueNumber).then((data) => {
      if (data)
        window.location.href =
          window.location.origin + "/Issue?IssueNumber=" + IssueNumber;
    });
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
          {showPreview && (
            <div className="Preview">
              <Markdown remarkPlugins={remarkGfm}>{description}</Markdown>
            </div>
          )}
        </div>
        <div className="ButtonWrapper">
          <button className="Submit-Button" onClick={handleSubmit}>
            Save issue
          </button>
          <button
            className="Cancel-Button"
            onClick={() => {
              window.location.href =
                window.location.origin + "/Issue?IssueNumber=" + IssueNumber;
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditIssue;
