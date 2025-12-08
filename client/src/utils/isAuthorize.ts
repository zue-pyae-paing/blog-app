import useAccountStore from "../store/useAccountStore";

export const checkIsAuthorized = (): boolean => {
  const accessToken = useAccountStore.getState().accessToken;
  if (!accessToken) return false;

  return true;
};
