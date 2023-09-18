import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserData,
  createPost,
  updatePost,
  deletePost,
} from "./utils/usersPage";

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [isCreatePostFormVisible, setIsCreatePostFormVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postFormData, setPostFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false,
  });
  const [updatePostFormData, setUpdatePostFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false,
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the presence of a token
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token is found, redirect the user to the root path
      navigate("/login");
      return; // Stop further execution of this component
    }

    // Continue with your component logic if a token is found
    const fetchData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        setUserData(userData);
      }
    };

    fetchData();
  }, [navigate]);

  const toggleCreatePostForm = () => {
    setIsCreatePostFormVisible(!isCreatePostFormVisible);
  };

  const handleInputChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (formType === "post") {
      setPostFormData({ ...postFormData, [name]: newValue });
    } else if (formType === "update") {
      setUpdatePostFormData({ ...updatePostFormData, [name]: newValue });
    }
  };

  const handleCreatePost = async () => {
    const result = await createPost(postFormData);
    if (result) {
      // Post created successfully, update your component state as needed
      setPostFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        willDeliver: false,
      });
      setIsCreatePostFormVisible(false);
    }
  };

  const handleUpdatePost = async () => {
    const result = await updatePost(selectedPostId, updatePostFormData);
    if (result) {
      // Post updated successfully, update your component state as needed
      setUpdatePostFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        willDeliver: false,
      });
      setSelectedPostId(null);
      setIsZoomed(false); // Exit the zoomed mode
    }
  };

  const handleDeletePost = async (postId) => {
    const success = await deletePost(postId);
    if (success) {
      // Post deleted successfully, update your component state as needed
      setUserData((prevUserData) => ({
        ...prevUserData,
        posts: prevUserData.posts.filter((post) => post._id !== postId),
      }));
    }
  };

  const handleEditClick = (post) => {
    setSelectedPostId(post._id);
    setUpdatePostFormData({
      title: post.title,
      description: post.description,
      price: post.price || "",
      location: post.location || "",
      willDeliver: post.willDeliver,
    });
    setIsZoomed(true);
  };

  const handleExitZoom = () => {
    setSelectedPostId(null);
    setIsZoomed(false);
  };

  return (
    <div className="user-page">
      <div className="user-styling-div">
        <h2>User Profile</h2>
        {userData ? (
          <div>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <button onClick={toggleCreatePostForm}>Create Post</button>
        {isCreatePostFormVisible && (
          <div className="post-form">
            {/* Create a form for creating a post */}
            <h3>Create Post</h3>
            <form>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={postFormData.title}
                onChange={(e) => handleInputChange(e, "post")}
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={postFormData.description}
                onChange={(e) => handleInputChange(e, "post")}
              />
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={postFormData.price}
                onChange={(e) => handleInputChange(e, "post")}
              />
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={postFormData.location}
                onChange={(e) => handleInputChange(e, "post")}
              />
              <label htmlFor="willDeliver">Will Deliver:</label>
              <input
                type="checkbox"
                id="willDeliver"
                name="willDeliver"
                checked={postFormData.willDeliver}
                onChange={(e) => handleInputChange(e, "post")}
              />
              <button type="button" onClick={handleCreatePost}>
                Create
              </button>
            </form>
          </div>
        )}
        {userData ? (
          <div className="my-post-section">
            <h3>My Posts</h3>
            {userData.posts.length > 0 ? (
              <ul>
                {userData.posts.map((post) => (
                  <li key={post._id}>
                    <p>
                      <strong>Title:</strong> {post.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {post.description}
                    </p>
                    <button onClick={() => handleEditClick(post)}>Edit</button>
                    <button onClick={() => handleDeletePost(post._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
        ) : null}

        {selectedPostId && (
          <div className={`update-post-form ${isZoomed ? "zoomed" : ""}`}>
            {/* Create a form for updating a post */}
            <h3>Edit Post</h3>
            <button onClick={handleExitZoom} className="exit-zoom-button">
              Exit Zoom
            </button>
            <form>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={updatePostFormData.title}
                onChange={(e) => handleInputChange(e, "update")}
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={updatePostFormData.description}
                onChange={(e) => handleInputChange(e, "update")}
              />
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={updatePostFormData.price}
                onChange={(e) => handleInputChange(e, "update")}
              />
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={updatePostFormData.location}
                onChange={(e) => handleInputChange(e, "update")}
              />
              <label htmlFor="willDeliver">Will Deliver:</label>
              <input
                type="checkbox"
                id="willDeliver"
                name="willDeliver"
                checked={updatePostFormData.willDeliver}
                onChange={(e) => handleInputChange(e, "update")}
              />
              <button type="button" onClick={handleUpdatePost}>
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
