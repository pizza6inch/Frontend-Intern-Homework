import "./Post.css";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { closeIssue } from "../../api";

function Post(props) {
  function EditIssue() {
    if (props.issue.author_association !== "OWNER") {
      alert("Permission Denied : You are not the author of this issue.");
      return;
    }
    window.location.href =
      window.location.origin + "editIssue?IssueNumber=" + props.issue.number;
  }

  async function handleClose() {
    if (props.issue.author_association !== "OWNER") {
      alert("Permission Denied : You are not the author of this issue.");
      return;
    }
    closeIssue(props.issue.number).then((data) => {
      if (data) window.location.href = window.location.origin;
    });
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
                <button className="Edit-Button" onClick={EditIssue}>
                  Edit
                </button>
                <button className="Delete-Button" onClick={handleClose}>
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
