import "./Comment.css";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
function Comment(props) {
  // Conditional rendering while the comments are being loaded

  const mark = "```javascript\n + markdown + \n```\n";

  if (props.comments === undefined) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="Comment-wrapper">
        <div className="Comments">
          {/* <div className="Comment-Title">Comments</div> */}
          {props.comments.map((comment, i) => {
            return (
              <div className="Comment" key={i}>
                <div className="Comment-User">
                  {comment.user.login} commented at {comment.updated_at}
                </div>
                <div className="Comment-Body">
                  <Markdown remarkPlugins={remarkGfm}>{mark}</Markdown>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Comment;
