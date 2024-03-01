import "./PostPrev.css";
function PostPrev(Issue) {
  function clickPost(number) {
    window.location.href = "http://localhost:5173/post?number=" + number;
  }
  return (
    <div className="PostPrev">
      <div className="Number">{Issue.number + 1}</div>
      <div className="Issue-wrapper">
        <div className="Head-wrapper">
          <div className="Title">{Issue.title}</div>
          <div className="updated_at">updated_at: {Issue.updated_at}</div>
        </div>
        <div className="Text" onClick={() => clickPost(Issue.number)}>
          {Issue.body}
        </div>
      </div>
    </div>
  );
}
export default PostPrev;
