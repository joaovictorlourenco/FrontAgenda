import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    console.log(response);

    const { token } = response.data;

    return token;
  } catch (error: any) {
    console.log("Erro ao fazer login:", error.message);

    throw error;
  }
};

export default api;
