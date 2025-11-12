// utils/checkIsAuthorized.ts
import { jwtDecode } from "jwt-decode";
import useAccountStore from "../store/useAccountStore";

type JwtPayload = {
  exp: number;
};

export const checkIsAuthorized = (): boolean => {
  const accessToken = useAccountStore.getState().accessToken;
  if (!accessToken) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);
    if (decoded.exp * 1000 < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
};
