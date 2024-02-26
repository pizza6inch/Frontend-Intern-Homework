import "./Post.css";
function Post(Issue) {
  return (
    <div className="Post">
      <div className="Number">{Issue.number + 1}</div>
      <div className="Issue-wrapper">
        <div className="Head-wrapper">
          <div className="Title">{Issue.title}</div>
          <div className="State">State: {Issue.state}</div>
        </div>
        <div className="Text">{Issue.body}</div>
      </div>
    </div>
  );
}
export default Post;
