import { apiUrl } from "./config.js";
import { getUserInfo } from "./localStorage.js";

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

export const register = async ({ name, email, password }) => {
  try {
    const response = await fetch(apiUrl + "/api/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!response || !response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const update = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();
    console.log(_id);
    const response = await fetch(apiUrl + "/api/users/" + _id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!response || !response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const response = await fetch(apiUrl + "/api/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    if (!response || !response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};
