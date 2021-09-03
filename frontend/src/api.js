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
