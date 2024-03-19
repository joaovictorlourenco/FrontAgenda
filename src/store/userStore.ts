import { create } from "zustand";

type State = {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
  email: string;
  name: string;
  id: string;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setId: (id: string) => void;
};

const userStore = create<State>((set) => ({
  token: "",
  email: "",
  name: "",
  id: "",

  setEmail: (email: string) => {
    set({ email });
  },

  setToken: (token: string) => {
    set({ token: token });
  },

  clearToken: () => set({ token: "" }),

  setName: (name: string) => {
    set({ name });
  },

  setId: (id: string) => {
    set({ id });
  },
}));

export default userStore;
