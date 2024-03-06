// Import the PostPrev.css file for styling
import "./PostPrev.css";

// Define the PostPrev functional component that accepts an "Issue" prop
function PostPrev(Issue) {
  // Define the clickPost function that takes a number as an argument
  function clickPost(number) {
    // Change the current webpage location to the URL with the issue number
    window.location.href = "http://localhost:5173/post?number=" + number;
  }

  // Return the PostPrev component JSX
  return (
    <div className="PostPrev">
      {/* Display the issue number plus one */}
      <div className="Number">{Issue.number + 1}</div>
      <div className="Issue-wrapper">
        <div className="Head-wrapper">
          {/* Display the issue title */}
          <div className="Title">{Issue.title}</div>
          {/* Display the issue updated_at timestamp */}
          <div className="updated_at">updated_at: {Issue.updated_at}</div>
        </div>
        {/* Display the issue body and attach an onClick event listener to redirect to the issue post */}
        <div className="Text" onClick={() => clickPost(Issue.number)}>
          {Issue.body}
        </div>
      </div>
    </div>
  );
}

// Export the PostPrev component for use in other modules
export default PostPrev;
