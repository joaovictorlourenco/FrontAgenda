// store.js
import { create } from "zustand";

type State = {
  token: string;
  setToken: (token: string) => void;
};

const tokenStore = create<State>((set) => ({
  token: "",
  setToken: (token: string) => set({ token: token }),
  clearToken: () => set({ token: "" }),
}));

export default tokenStore;
