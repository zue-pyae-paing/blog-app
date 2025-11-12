import { jwtDecode } from "jwt-decode";
import useAccountStore from "../store/useAccountStore";
type JwtPayload = {
  id: string;
};
export const checkOwner = (userId: string) => {
  const accessToken = useAccountStore.getState().accessToken;
  if (!accessToken) return false;
  try {
    const decode = jwtDecode<JwtPayload>(accessToken);
    if (decode.id === userId) return true;
  } catch (error) {
    return false;
  }
};
