import { E } from "math";
import "./Post.css";
import EditModal from "../Modal/EditModal";
import { useState, useEffect } from "react";
function Post(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    if (localStorage.getItem("accessToken") === null) {
      alert("You need to login first");
      return;
    }
    setIsOpen(true);
  }

  function closeIssue() {
    if (localStorage.getItem("accessToken") === null) {
      alert("You need to login first");
      return;
    }
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
            <div className="Post-Body">{props.issue.body}</div>
            <div className="Comment">Comment</div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
