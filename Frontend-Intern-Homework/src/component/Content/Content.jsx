import PostPrev from "../PostPrev/PostPrev";
import "./Content.css";
function Content(props) {
  function AddIssue() {
    if (localStorage.getItem("accessToken") === null) {
      alert("You need to login first");
      return;
    }
    window.location.href = "/newIssue";
  }

  function getContent(Issues, lastIssueElementRef) {
    if (Issues[0] === undefined) {
      return <div className="Content-Title">wait a moment...</div>;
    } else if (Issues.length === 0) {
      return <div className="Content-Title">No Issue</div>;
    } else {
      return Issues.map((Issue, i) => {
        if (Issues.length === i + 1) {
          // detect the last issue
          return (
            <div className="Post-wrapper" key={i}>
              <PostPrev IssueNumber={i} Issue={Issue}></PostPrev>
              <div
                className="loading"
                key={"loading"}
                ref={lastIssueElementRef} // set a loading div behind last issue element to observer
              >
                No more Issue...
              </div>
            </div>
          );
        } else {
          return (
            <div className="Post-wrapper" key={i}>
              <PostPrev IssueNumber={i} Issue={Issue}></PostPrev>
            </div>
          );
        }
      });
    }
  }
  return (
    <div className="Content" key={"Content"}>
      <div className="ContentTitle-wrapper">
        <div className="Content-Title">Here is your Issues</div>
        <button className="Add-Button" onClick={AddIssue}>
          New Issue
        </button>
      </div>
      {getContent(props.Issues, props.lastIssueElementRef)}
    </div>
  );
}

export default Content;
