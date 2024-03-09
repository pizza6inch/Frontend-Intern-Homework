// Import the PostPrev.css file for styling
import "./PostPrev.css";

import { marked } from "marked";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function PostPrev(props) {
  // Define the clickPost function that takes a number as an argument
  function clickPost(IssueNumber) {
    // Change the current webpage location to the URL with the issue number
    window.location.href =
      "http://localhost:5173/post?IssueNumber=" + IssueNumber;
  }

  // Return the PostPrev component JSX
  return (
    <div className="PostPrev">
      {/* Display the issue number plus one */}
      <div className="Number">{props.IssueNumber + 1}</div>
      <div className="Issue-wrapper">
        <div className="Head-wrapper">
          {/* Display the issue title */}
          <div className="Title">{props.Issue.title}</div>
          {/* Display the issue updated_at timestamp */}
          <div className="updated_at">updated_at: {props.Issue.updated_at}</div>
        </div>

        <div className="Text" onClick={() => clickPost(props.IssueNumber)}>
          <Markdown remarkPlugins={remarkGfm}>{props.Issue.body}</Markdown>
        </div>
      </div>
    </div>
  );
}

// Export the PostPrev component for use in other modules
export default PostPrev;
