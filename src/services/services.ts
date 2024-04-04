import api from "./api";

type service = {
  id: string;
  name: string;
  description: string;
  value: number;
  customerId: string;
  vehiclesId: string;
  vehicles: {
    id: string;
    type: string;
    brand: string;
    model: string;
    year: number;
  };
  customers: {
    id: string;
    name: string;
    cpf: string;
    cellphone: string;
  };
};

export const getAllServices = async (token: string): Promise<service[]> => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/service");

    return response.data as service[];
  } catch (error: any) {
    return error;
  }
};

export const filterService = async (token: string, search: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`/service/filter/${search}`);

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const createService = async (token: string, data: any) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.post("/service", data);

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const deleteService = async (token: string, id: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.delete(`/service/${id}`);

    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const editService = async (token: string, data: any, id: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.put(`/service/${id}`, data);

    return response.data;
  } catch (error: any) {
    return error;
  }
};
