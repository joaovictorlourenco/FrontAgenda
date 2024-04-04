import api from "./api";

export interface Client {
  id?: string;
  name: string;
  cpf: string;
  cellphone: string;
}

export const getAllClients = async (token: string): Promise<Client[]> => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/customer");

    return response.data as Client[];
  } catch (error: any) {
    throw error;
  }
};

export const createClient = async (
  token: string,
  client: Client
): Promise<any> => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.post("/customer", client);

    return response.data as Client;
  } catch (error: any) {
    throw error;
  }
};

export const deleteClient = async (token: string, id: string): Promise<any> => {
  try {
    console.log(id, token);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.delete(`/customer/${id}`);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const filterClient = async (
  token: string,
  search: string
): Promise<Client[]> => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`/customer/filter/${search}`);

    return response.data as Client[];
  } catch (error: any) {
    throw error;
  }
};

export const editClient = async (data: Client, token: string) => {
  try {
    console.log(data);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.put(`/customer/${data.id}`, data);

    return response.data as Client;
  } catch (error: any) {
    throw error;
  }
};
