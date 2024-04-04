import api from "./api";

export const getAllServices = async (token: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/service");

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const filterService = async (token: string, search: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`/customer/search/${search}`);

    return response.data;
  } catch (error: any) {
    return error;
  }
};
