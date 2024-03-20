import "./Post.css";

import EditModal from "../Modal/EditModal";
import { marked } from "marked";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Post(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    if (localStorage.getItem("accessToken") === null) {
      alert("You need to login first");
      return;
    }
    setIsOpen(true);
  }

  async function closeIssue() {
    if (localStorage.getItem("accessToken") === null) {
      alert("You need to login first");
      return;
    }
    await fetch("http://localhost:4000/closeIssue", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        number: props.issue.number,
      },
    });
    window.location.href = "http://localhost:5173/home";
  }

  if (props.issue === undefined) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div className="Post-wrapper">
          <div className="Post">
            <div className="Title-wrapper">
              <div className="Title-Text-wrapper">
                <div className="Post-Title">{props.issue.title}</div>
                <div className="Tag">#{props.issue.number}</div>
              </div>
              <div className="Button-wrapper">
                <button className="Edit-Button" onClick={openModal}>
                  Edit
                </button>
                <EditModal
                  issue={props.issue}
                  isOpen={modalIsOpen}
                  setIsOpen={setIsOpen}
                />
                <button className="Delete-Button" onClick={closeIssue}>
                  Close issue
                </button>
              </div>
            </div>
            <div className="Post-Body">
              <Markdown remarkPlugins={remarkGfm}>{props.issue.body}</Markdown>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
