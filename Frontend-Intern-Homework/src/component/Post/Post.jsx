import { E } from "math"; // I'm not sure what 'E' is imported from 'math' here
import "./Post.css";
import EditModal from "../Modal/EditModal"; // This component is used for editing the post

import { useState, useEffect } from "react"; // These hooks are used for managing state and side effects

function Post(props) {
  // Declaring a state variable 'modalIsOpen' to control the modal visibility
  const [modalIsOpen, setIsOpen] = useState(false);

  // Function to open the edit modal
  function openModal() {
    if (localStorage.getItem("accessToken") === null) {
      alert("You need to login first");
      return;
    }
    setIsOpen(true);
  }

  // Function to close the issue
  function closeIssue() {
    if (localStorage.getItem("accessToken") === null) {
      alert("You need to login first");
      return;
    }
  }

  // Conditional rendering while the issue is being loaded
  if (props.issue === undefined) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div className="Post-wrapper">
          <div className="Post">
            <div className="Title-wrapper">
              <div className="Title-Text-wrapper">
                {/* Displaying the issue title */}
                <div className="Post-Title">{props.issue.title}</div>
                {/* Displaying the issue number as a tag */}
                <div className="Tag">#{props.issue.number}</div>
              </div>
              <div className="Button-wrapper">
                {/* Button to open the edit modal */}
                <button className="Edit-Button" onClick={openModal}>
                  Edit
                </button>
                {/* The EditModal component receives issue, isOpen, and setIsOpen as props */}
                <EditModal
                  issue={props.issue}
                  isOpen={modalIsOpen}
                  setIsOpen={setIsOpen}
                />
                {/* Button to close the issue */}
                <button className="Delete-Button" onClick={closeIssue}>
                  Close issue
                </button>
              </div>
            </div>
            {/* Displaying the issue body */}
            <div className="Post-Body">{props.issue.body}</div>
            {/* Displaying the comment section */}
            <div className="Comment">Comment</div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
