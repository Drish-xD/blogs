import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    setLocalStorage(window.localStorage);
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmit = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name", name);
      localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Post Comment</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          ref={nameEl}
          className="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          ref={emailEl}
          className="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2"
          >
            Save my e-mail and name for the next time i comment.
          </label>
        </div>
      </div>
      {error && (
        <span className="text-xs font-semibold text-red-500">
          * All Fields are Required.
        </span>
      )}
      <div className="mt-6 text-center md:text-left">
        <button
          className="cursor-pointer transition duration-300 hover:bg-purple-500 inline-block bg-purple-400 text-lg font-semibold rounded-full text-white px-8 py-1"
          type="submit"
          onClick={handleCommentSubmit}
        >
          Submit
        </button>
        {showSuccessMessage && (
          <span className="text-base block float-none md:float-right font-semibold mt-2 text-green-500">
            Comment Submited for Review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
