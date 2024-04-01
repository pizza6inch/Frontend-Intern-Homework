import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function EditIssue() {
  const [Issue, setIssue] = useState();
  const [rerender, setRerender] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const IssueNumber = new URLSearchParams(window.location.search).get(
    "IssueNumber"
  );
  var called = false; //to prevent multiple calls to getIssue
  useEffect(() => {
    if (Issue === undefined && called === false) {
      getIssue(IssueNumber);
      called = true;
    } else if (Issue !== undefined) {
      setTitle(Issue.title);
      setDescription(Issue.body);
    }
    // console.log(Issue);
  }, [rerender]);

  async function getIssue(IssueNumber) {
    await fetch("http://localhost:4000/getIssue", {
      method: "GET",
      headers: {
        number: IssueNumber,
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIssue(data);
        setRerender(!rerender);
      });
  }

  async function handleSubmit() {
    if (title.length === 0) {
      alert("Title cannot be empty");
      return;
    }
    if (description.length < 30) {
      alert("description cannot be less than 30 characters");
      return;
    }
    //console.log(JSON.stringify({ title, body: description }));
    await fetch("http://localhost:4000/updateIssue", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        number: IssueNumber, //not IssueNumber IssueNuber refers to the index of the issue in the list of issues
        // Issue.number refers to the issue number
        body: JSON.stringify({ title, body: description }),
      },
    });
    //console.log("updateIssue");
    window.location.href = "http://localhost:5173";
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
              window.location.href = "http://localhost:5173";
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
