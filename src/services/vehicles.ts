import api from "./api";

export interface Vehicle {
  id?: string;
  type: string;
  brand: string;
  model: string;
  year: number;
}

export const getAllVehicles = async (token: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/vehicle");

    return response.data as Vehicle[];
  } catch (error: any) {
    throw error;
  }
};

export const createVehicle = async (token: string, data: Vehicle) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.post("/vehicle", data);

    return response.data as Vehicle;
  } catch (error: any) {
    throw error;
  }
};

export const deleteVehicle = async (token: string, id: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.delete(`/vehicle/${id}`);
    console.log(response);

    return response.data as Vehicle;
  } catch (error: any) {
    throw error;
  }
};

export const filterVehicle = async (token: string, search: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`/vehicle/filter/${search}`);

    return response.data as Vehicle[];
  } catch (error: any) {
    throw error;
  }
};

export const editVehicle = async (vehicle: Vehicle, token: string) => {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.put(`/vehicle/${vehicle.id}`, vehicle);

    return response.data as Vehicle;
  } catch (error: any) {
    throw error;
  }
};
