// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  password: "",
  email: "",
  updateEmail: (newEmail: string) => set({ email: newEmail }),
  updatePassword: (newPassword: string) => set({ password: newPassword }),
}));

export default useStore;
