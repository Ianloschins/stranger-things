const COHORT_NAME = '2302-ACC-PT-WEB-PT-A';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const getToken = () => {
  return localStorage.getItem('token');
};

const fetchUserData = async () => {
  const token = getToken();
  if (!token) {
    console.error('Token not found.');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      return result.data;
    } else {
      console.error('Failed to fetch user data:', result.error.message);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const createPost = async (postFormData) => {
  const token = getToken();
  if (!token) {
    console.error('Token not found.');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: postFormData,
      }),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      console.error('Failed to create post:', result.error.message);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const updatePost = async (postId, updatePostFormData) => {
  const token = getToken();
  if (!token) {
    console.error('Token not found.');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: updatePostFormData,
      }),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      console.error('Failed to update post:', result.error.message);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deletePost = async (postId) => {
  const token = getToken();
  if (!token) {
    console.error('Token not found.');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      console.error('Failed to delete post.');
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export { fetchUserData, createPost, updatePost, deletePost };
