import Post from "../Post/Post";
import "./Content.css";
function Content(props) {
  function getContent(Issues) {
    if (Issues === undefined || Issues.length === 0) {
      return <div className="Content-Title">No Issue</div>;
    } else {
      return Issues.map((Issue, i) => (
        <Post
          key={i}
          number={i}
          title={Issue.title}
          state={Issue.state}
          body={Issue.body}
        />
      ));
    }
  }
  return (
    <div className="Content">
      <div className="Content-Title">Here is your Issues</div>
      {getContent(props.Issues)}
    </div>
  );
}

export default Content;
