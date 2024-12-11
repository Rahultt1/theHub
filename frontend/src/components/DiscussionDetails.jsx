import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRegCalendarAlt, FaSyncAlt, FaEllipsisV } from "react-icons/fa"; // Icons for dates and three-dot menu

const DiscussionDetails = () => {
  const location = useLocation(); // Get state passed through navigation
  const discussion = location.state; // Access the discussion data

  if (!discussion) {
    return <div className="p-6 max-w-4xl mx-auto"><h1>No Discussion Found</h1></div>;
  }

  const [comments, setComments] = useState(discussion.comments || []); // Use passed comments or empty array
  const [replyInputs, setReplyInputs] = useState({}); // Store the reply inputs for individual comments
  const [showMainReply, setShowMainReply] = useState(false); // Toggle visibility of the main topic reply box
  const [mainReply, setMainReply] = useState(""); // Input for the main reply box
  const [editInputs, setEditInputs] = useState({}); // Track edit mode for each comment/reply
  const [showDropdown, setShowDropdown] = useState(null); // Dropdown state for each comment/reply

  /** Main Discussion Reply */
  const handleMainReplySubmit = () => {
    if (!mainReply.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      user: "You",
      text: mainReply.trim(),
      date: new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      replies: [],
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setMainReply("");
    setShowMainReply(false);
  };

  /** Add Reply to Specific Comment */
  const handleCommentReplySubmit = (commentId) => {
    const replyToAdd = replyInputs[commentId]?.trim();
    if (!replyToAdd) return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.replies.push({
          id: `reply-${commentId}-${Date.now()}`,
          user: "You",
          text: replyToAdd,
          date: new Date().toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }
      return comment;
    });

    setReplyInputs({ ...replyInputs, [commentId]: "" });
    setComments(updatedComments);
  };

  /** Key Down Handling for Reply Submit */
  const handleKeyDown = (e, commentId = null) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (commentId === null) {
        handleMainReplySubmit();
      } else {
        handleCommentReplySubmit(commentId);
      }
    }
  };

  /** Toggle Dropdown */
  const toggleDropdown = (id) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };

  /** Handle Save Edit */
  const handleEditSave = (id, parentId = null, isReply = false) => {
    if (!editInputs[id]?.trim()) return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId || (!isReply && comment.id === id)) {
        if (isReply) {
          comment.replies = comment.replies.map((reply) =>
            reply.id === id ? { ...reply, text: editInputs[id] } : reply
          );
        } else {
          comment.text = editInputs[id];
        }
      }
      return comment;
    });

    setComments(updatedComments);
    setEditInputs((prev) => ({ ...prev, [id]: undefined })); // Clear the input after saving
    setShowDropdown(null);
  };

  /** Handle Delete */
  const handleDelete = (id, parentId = null, isReply = false) => {
    const updatedComments = comments.filter((comment) => {
      if (isReply && comment.id === parentId) {
        comment.replies = comment.replies.filter((reply) => reply.id !== id);
      }
      return comment.id !== id || isReply;
    });

    setComments(updatedComments);
    setShowDropdown(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-green-600">{discussion.question}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            Subtopic: <span className="text-green-500 font-medium">{discussion.subtopic}</span>
          </p>
          <p>
            Posted by: <span className="font-semibold">{discussion.author}</span>
          </p>
        </div>
        <div className="mt-4 flex text-sm text-gray-500 items-center">
          <span className="inline-flex items-center mr-4">
            <FaRegCalendarAlt className="mr-2" /> Published: {discussion.date}
          </span>
          <span className="inline-flex items-center">
            <FaSyncAlt className="mr-2" /> Last Updated: {discussion.lastUpdate}
          </span>
        </div>
      </div>

      {/* Main Reply Section */}
      <div className="bg-gray-50 shadow rounded-lg p-4">
        {!showMainReply ? (
          <button
            onClick={() => setShowMainReply(true)}
            className="text-green-600 font-medium hover:underline"
          >
            Add Reply
          </button>
        ) : (
          <div className="relative">
            <textarea
              value={mainReply}
              onChange={(e) => setMainReply(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Write your reply..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
            ></textarea>
            <button
              onClick={handleMainReplySubmit}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-600 hover:underline text-sm font-medium"
            >
              Send
            </button>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className={`bg-gray-50 shadow-lg rounded-lg p-4 ${
              index % 2 === 0 ? "mx-auto max-w-[calc(100%-70px)]" : "ml-[70px]"
            }`}
          >
            {/* Main Comment */}
            <div className="relative">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{comment.user}</h4>
                  {editInputs[comment.id] !== undefined ? (
                    <input
                      value={editInputs[comment.id]}
                      onChange={(e) =>
                        setEditInputs({ ...editInputs, [comment.id]: e.target.value })
                      }
                      className="border border-gray-300 px-2 rounded-md text-sm w-full"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm mt-2">{comment.text}</p>
                  )}
                  <small className="text-gray-500 text-xs mt-1 block">{comment.date}</small>
                </div>
                {/* Dropdown Menu */}
                <div className="relative">
                  <button onClick={() => toggleDropdown(comment.id)}>
                    <FaEllipsisV />
                  </button>
                  {showDropdown === comment.id && (
                    <div className="absolute right-0 bg-white shadow-md rounded-lg py-2 mt-2 z-10">
                      {editInputs[comment.id] !== undefined ? (
                        <button
                          onClick={() => handleEditSave(comment.id)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setEditInputs((prev) => ({
                              ...prev,
                              [comment.id]: comment.text,
                            }))
                          }
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reply Section */}
            <div className="mt-4">
              <button
                className="text-sm text-green-700 hover:underline"
                onClick={() =>
                  setReplyInputs({
                    ...replyInputs,
                    [comment.id]: replyInputs[comment.id] ? "" : "",
                  })
                }
              >
                Reply
              </button>

              {replyInputs[comment.id] !== undefined && (
                <div className="mt-6 ml-4 border-l pl-4 relative">
                  <input
                    type="text"
                    value={replyInputs[comment.id]}
                    onChange={(e) =>
                      setReplyInputs({
                        ...replyInputs,
                        [comment.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => handleKeyDown(e, comment.id)}
                    placeholder="Write your reply..."
                    className="w-full border border-gray-300 rounded-full px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                  />
                  <button
                    onClick={() => handleCommentReplySubmit(comment.id)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-600 hover:underline text-sm font-medium"
                  >
                    Send
                  </button>
                </div>
              )}

              {/* Replies Section */}
              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-3 ml-4 border-l pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-green-50 p-3 rounded-lg shadow-sm relative">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-800">{reply.user}</h5>
                          {editInputs[reply.id] !== undefined ? (
                            <input
                              value={editInputs[reply.id]}
                              onChange={(e) =>
                                setEditInputs({ ...editInputs, [reply.id]: e.target.value })
                              }
                              className="border border-gray-300 px-2 rounded-md text-sm w-full"
                            />
                          ) : (
                            <p className="text-gray-700 text-sm mt-1">{reply.text}</p>
                          )}
                          <small className="text-gray-500 text-xs block mt-1">{reply.date}</small>
                        </div>
                        {/* Dropdown Menu */}
                        <div className="relative">
                          <button onClick={() => toggleDropdown(reply.id)}>
                            <FaEllipsisV />
                          </button>
                          {showDropdown === reply.id && (
                            <div className="absolute right-0 bg-white shadow-md rounded-lg py-2 mt-2 z-10">
                              {editInputs[reply.id] !== undefined ? (
                                <button
                                  onClick={() =>
                                    handleEditSave(reply.id, comment.id, true)
                                  }
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                                >
                                  Save Reply
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    setEditInputs((prev) => ({
                                      ...prev,
                                      [reply.id]: reply.text,
                                    }))
                                  }
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                                >
                                  Edit Reply
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(reply.id, comment.id, true)}
                                className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                              >
                                Delete Reply
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionDetails;