import { create } from 'zustand';
import { User, UserState } from './lib/types';

const useStore = create<UserState>((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  users: [] as User[],
  setUsers: (users: User[]) => set({ users }),
  userCount: 0,
  setUserCount: (userCount: number) => set({ userCount }),
  user: {} as User,
  setUser: (user: User) => set({ user }),
  currentUserLogin: '',
  setCurrentUserLogin: (currentUserLogin: string) => set({ currentUserLogin })
}));

export default useStore;
