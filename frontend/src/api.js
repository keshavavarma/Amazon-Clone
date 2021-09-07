import { apiUrl } from "./config.js";

export const getProduct = async (id) => {
  try {
    const response = await fetch(apiUrl + "/api/products/" + id, {
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response || !response.ok) {
      throw new Error("Cannot Fetch Data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const signin = async ({ email, password }) => {
  try {
    const response = await fetch(apiUrl + "/api/users/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response || !response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText + ", Invalid username or Password");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};
