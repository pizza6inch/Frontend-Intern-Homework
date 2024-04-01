import "./PostPrev.css";

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
        <div className="Title">{props.Issue.title}</div>
        <div className="Text" onClick={() => clickPost(props.Issue.number)}>
          <Markdown remarkPlugins={remarkGfm}>{props.Issue.body}</Markdown>
        </div>
      </div>
      <div className="Info-wrapper">
        <div className="Title-wrapper">
          <div className="Tag">#{props.Issue.number}</div>
          <div className="updated_at">updated_at: {props.Issue.updated_at}</div>
        </div>
        <div className="created_by">created_by: {props.Issue.user.login}</div>
      </div>
    </div>
  );
}

export default PostPrev;
