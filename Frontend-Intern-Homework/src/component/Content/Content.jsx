import PostPrev from "../PostPrev/PostPrev";
import "./Content.css";
import { useRef, useCallback } from "react";
function Content(props) {
  function getContent(Issues, lastIssueElementRef) {
    if (Issues === undefined || Issues.length === 0) {
      return <div className="Content-Title">No Issue</div>;
    } else {
      return Issues.map((Issue, i) => {
        if (Issues.length === i + 1) {
          return (
            <div className="Post-wrapper" key={i}>
              <PostPrev
                number={i}
                title={Issue.title}
                updated_at={Issue.updated_at}
                body={Issue.body}
              ></PostPrev>
              <div
                className="loading..."
                key={"loading"}
                ref={lastIssueElementRef}
              ></div>
            </div>
          );
        } else {
          return (
            <div className="Post-wrapper" key={i}>
              <PostPrev
                number={i}
                title={Issue.title}
                updated_at={Issue.updated_at}
                body={Issue.body}
              ></PostPrev>
            </div>
          );
        }
      });
    }
  }
  return (
    <div className="Content" key={"Content"}>
      <div className="Content-Title">Here is your Issues</div>
      {getContent(props.Issues, props.lastIssueElementRef)}
    </div>
  );
}

export default Content;
