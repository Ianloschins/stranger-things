import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-A";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${BASE_URL}/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setPosts(result.data.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [navigate]);

  const postMessage = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: messageInput,
          },
        }),
      });

      const result = await response.json();
      console.log(result);
      setMessageInput("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="posts-list">
      <div className="posty">
      <h2>Posts List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id} className="post-container">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p className="post-price">{post.price}</p>
            <p>Location: {post.location}</p>
            <p>Price: {post.price}</p>
            <p>Will Deliver: {post.willDeliver ? "Yes" : "No"}</p>
            <p>Author: {post.author.username}</p>
            <p>Created At: {post.createdAt}</p>
            <p>Updated At: {post.updatedAt}</p>

            {/* Add a button to toggle message input */}
            <button onClick={() => postMessage(post._id)}>Send Message</button>

            {/* Add an input for posting messages */}
            <input
              type="text"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default PostsList;
