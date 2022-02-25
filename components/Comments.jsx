import React, { useEffect, useState } from "react";
import moment from "moment";
import parser from "html-react-parser";
import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  console.log(comments);

  useEffect(() => {
    getComments(slug).then((res) => setComments(res));
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {comments.length} Comments
      </h3>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.createdAt}
            className="border-b border-gray-100 mb-4 pb-4"
          >
            <p className="mb-4">
              <span className="font-semibold">{comment.name}</span> on{" "}
              {moment(comment.createdAt).format("MMM DD, YYYY")}
            </p>
            <p className="whitespace-pre-line text-gray-600 w-full">
              {parser(comment.comment)}
            </p>
          </div>
        ))
      ) : (
        <p className="mb-4 text-center">
          There are currently no responses for this blog.
          <br />
          Be the first to respond.
        </p>
      )}
    </div>
  );
};

export default Comments;
