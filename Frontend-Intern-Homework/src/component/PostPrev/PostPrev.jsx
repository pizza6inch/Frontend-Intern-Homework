import "./PostPrev.css";

import { marked } from "marked";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function PostPrev(props) {
  function clickPost(IssueNumber) {
    window.location.href =
      "http://localhost:5173/post?IssueNumber=" + IssueNumber;
  }

  return (
    <div className="PostPrev">
      <div className="Number">{props.IssueNumber + 1}</div>
      <div className="Issue-wrapper">
        <div className="Head-wrapper">
          <div className="Title">{props.Issue.title}</div>
          <div className="updated_at">updated_at: {props.Issue.updated_at}</div>
        </div>

        <div className="Text" onClick={() => clickPost(props.IssueNumber)}>
          <Markdown remarkPlugins={remarkGfm}>{props.Issue.body}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default PostPrev;
