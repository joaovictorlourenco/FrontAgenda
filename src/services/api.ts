import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return response;
  } catch (error: any) {
    return error;
  }
};

export default api;
