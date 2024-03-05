import PostPrev from "../PostPrev/PostPrev";
import "./Content.css";
import { useRef, useCallback, useState } from "react";
import AddModal from "../Modal/AddModal";
function Content(props) {
  const [IsOpen, setIsOpen] = useState(false);
  function AddIssue() {
    if (localStorage.getItem("accessToken") === null) {
      alert("You need to login first");
      return;
    }
    setIsOpen(true);
  }

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
      <div className="Title-wrapper">
        <div className="Content-Title">Here is your Issues</div>
        <button className="Add-Button" onClick={AddIssue}>
          New Issue
        </button>
        <AddModal isOpen={IsOpen} setIsOpen={setIsOpen} />
      </div>
      {getContent(props.Issues, props.lastIssueElementRef)}
    </div>
  );
}

export default Content;
