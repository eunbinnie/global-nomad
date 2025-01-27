import { create } from 'zustand';

import type { Response } from '@/_types/authentication';

interface UserState {
  isLogIn: boolean;
  logout: () => void;
  setLoginStatus: (status: boolean, response?: Response) => void;
  user: Response | null;
}

const useUserStore = create<UserState>((set) => ({
  isLogIn: false,
  logout: () => {
    set({ isLogIn: false, user: null });
    localStorage.removeItem('user');
    localStorage.removeItem('isLogIn');
  },
  setLoginStatus: (status, response) => {
    set({ isLogIn: status, user: response || null });
    if (status && response) {
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('isLogIn', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isLogIn');
    }
  },
  user: null,
}));

export default useUserStore;
