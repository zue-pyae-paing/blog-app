import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";

interface AccountState {
  accessToken: string;
  account: User;
  setAccount: (account: User) => void;
  setAccessToken: (accessToken: string) => void;
  removeAccount: () => void;
  logout: () => void;
}
const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      accessToken: "",
      account: {} as User,
      setAccount: (accountData) => set({ account: accountData }),
      setAccessToken: (accessToken) => set({  accessToken }),
      removeAccount: () => set({ account: {} as User }),
      logout: () => set({ accessToken: "", account: {} as User }),
    }),
    {
      name: "account-storage",
    }
  )
);
export default useAccountStore;
