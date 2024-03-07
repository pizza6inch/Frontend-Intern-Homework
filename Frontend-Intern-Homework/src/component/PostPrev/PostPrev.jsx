// Import the PostPrev.css file for styling
import "./PostPrev.css";

import { marked } from "marked";

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

        <div
          className="Text"
          onClick={() => clickPost(Issue.number)}
          dangerouslySetInnerHTML={{ __html: marked(Issue.body) }}
        ></div>

      </div>
    </div>
  );
}

// Export the PostPrev component for use in other modules
export default PostPrev;
