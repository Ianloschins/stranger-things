const COHORT_NAME = "2302-ACC-PT-WEB-PT-A";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const getMessageList = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      console.error("Failed to fetch message list:", result.error.message);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
export { getMessageList };

const deleteMessage = async (messageId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      console.error("Failed to delete message:", result.error.message);
      return null;
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    return null;
  }
};

const updateMessage = async (messageId, content) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/messages/${messageId}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: { content } }),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      console.error("Failed to update message:", result.error.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating message:", error);
    return null;
  }
};

export { deleteMessage, updateMessage };
