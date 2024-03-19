import api from "./api";

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

export const validateToken = async (token: string) => {
  try {
    const response = await api.post("/auth/validateToken", { token });

    if (response.status === 400) {
      return false;
    }

    return response;
  } catch (error: any) {
    return error;
  }
};

export const getUser = async (token: string, email: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`/users/${email}`);

    return response.data;
  } catch (error: any) {
    return error;
  }
};
