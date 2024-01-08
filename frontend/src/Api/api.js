import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const instance = axios.create({
  baseURL: `${BACKEND_URL}:${BACKEND_PORT}`,
  timeout: 30000,
});

const requests = {
  get: async (url) => {
    return instance
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};

export const getCountries = async (searchTerm) => {
  if (!searchTerm) {
    return { error: "No search term provided" };
  }
  if (searchTerm.length < 3) {
    return { error: "Search term must be at least 3 characters" };
  }
  try {
    const response = await requests.get(`/countries?name=${searchTerm}`);
    return response;
  } catch (error) {
    console.log("error:", error);
    return { error: "An error occurred on the server" };
  }
};
