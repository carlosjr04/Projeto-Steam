import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Cargo = 'ADMIN' | 'CLIENTE';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  cargo: Cargo | null;
  setAuthenticated: (data: { token: string; userId: string; cargo: Cargo }) => void;
  setUserInfo: (data: { userId: string; cargo: Cargo }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
  (set) => ({
    isAuthenticated: false,
    token: null,
    userId: null,
    cargo: null,
    setAuthenticated: ({ token, userId, cargo }) =>
      set({ isAuthenticated: true, token, userId, cargo }),
    setUserInfo: ({ userId, cargo }) =>
      set({ userId, cargo }),
    logout: () =>
      set({ isAuthenticated: false, token: null, userId: null, cargo: null }),
  }),
  {
    name: 'auth', // nome da chave no localStorage
  }
)

);