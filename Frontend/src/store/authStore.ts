import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Cargo = 'ADMIN' | 'CLIENTE';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: number | null;
  cargo: Cargo | null;
  setAuthenticated: (data: { token: string; userId: number; cargo: Cargo }) => void;
  setUserInfo: (data: { userId: number; cargo: Cargo }) => void;
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
      name: 'auth',
      partialize: (state) => ({ token: state.token }), // só persiste o token
    }
  )
);