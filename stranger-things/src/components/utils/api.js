const COHORT_NAME = '2302-ACC-PT-WEB-PT-A';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const loginUser = async (formData, setIsLoading, navigate) => {
  try {
    setIsLoading(true);

    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: formData.username,
          password: formData.password,
        },
      }),
    });
    const result = await response.json();

    if (result.success && result.data.token) {
      localStorage.setItem('token', result.data.token);
      setIsLoading(false);
      navigate('/');
    } else {
      console.error('Login failed.');
      setIsLoading(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoading(false);
  }
};

export const registerUser = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: formData.username,
            password: formData.password,
          },
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };