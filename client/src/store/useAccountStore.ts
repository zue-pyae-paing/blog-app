import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";

interface AccountState {
  accessToken: string;
  refreshToken: string;
  account: User;
  setAccount: (account: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  removeAccount: () => void;
  logout: () => void;
}
const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      account: {} as User,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      setAccount: (accountData) => set({ account: accountData }),
      removeAccount: () => set({ account: {} as User }),
      logout: () => set({ accessToken: "", refreshToken: "", account: {} as User }),
    }),
    {
      name: "account-storage",
    }
  )
);
export default useAccountStore;
