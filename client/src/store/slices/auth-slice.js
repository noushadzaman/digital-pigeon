import { create } from "zustand";

export const createAuthSlice = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
}));
