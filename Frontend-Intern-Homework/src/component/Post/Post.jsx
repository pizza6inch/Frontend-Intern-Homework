import { E } from "math";
import "./Post.css";
function Post(props) {
  const Issue = props.issue;
  console.log(Issue);
  if (Issue === undefined) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="Post-wrapper">
        <div className="Post">
          <div className="Title-wrapper">
            <div className="Title-Text-wrapper">
              <div className="Post-Title">{Issue.title}</div>
              <div className="Tag">#{Issue.number}</div>
            </div>
            <div className="Button-wrapper">
              <button className="Edit-Button">Edit</button>
              <button className="Add-Button">New issue</button>
            </div>
          </div>
          <div className="Post-Body">{Issue.body}</div>
          <div className="Comment">Comment</div>
        </div>
      </div>
    );
  }
}

export default Post;
