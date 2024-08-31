import auth from "@/utils/auth";
import { create } from "zustand";

interface IAppState {
  isAuthorized: boolean;
  isOpen: boolean;
  onSetIsOpen: (val: boolean) => void;
  logout: () => void;
  login: () => void;
}

export const useAppStore = create<IAppState>((set) => ({
  isAuthorized: auth.getToken() !== null && auth.getToken() !== undefined,
  isOpen: false,
  onSetIsOpen: (val: boolean) => set(() => ({ isOpen: val })),
  login: () => set(() => ({ isAuthorized: true })),
  logout: () => {
    auth.clearToken();
    auth.clearUserInfo();
    auth.clearRefreshToken();
    location.replace('/')
    set(() => ({ isAuthorized: false }));
  },
}));
