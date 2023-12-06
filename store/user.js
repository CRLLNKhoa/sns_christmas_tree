import { create } from "zustand";

export const useUser = create((set) => ({
  user: undefined,
  tree: undefined,
  list: undefined,
  setUser: (user) => set(() => ({ user })),
  setMyTree: (tree) => set(() => ({ tree })),
  setList: (list) => set(() => ({ list })),
}));
