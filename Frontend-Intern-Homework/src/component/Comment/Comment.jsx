import "./Comment.css";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
function Comment(props) {
  // Conditional rendering while the comments are being loaded

  if (props.comments.length === 0) {
    return <div>No Comment</div>;
  } else if (props.comments[0] === undefined) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="Comment-wrapper">
        <div className="Comments">
          {props.comments.map((comment, i) => {
            return (
              <div className="Comment" key={i}>
                <div className="Comment-Title">
                  <div className="Comment-User">
                    {comment.user.login} commented at
                  </div>
                  <div className="Comment-Time">{comment.updated_at}</div>
                </div>
                <div className="Comment-Body">
                  <Markdown remarkPlugins={remarkGfm}>{comment.body}</Markdown>
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
