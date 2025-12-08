import { redirect } from "react-router";
import useAccountStore from "../store/useAccountStore";

export async function protectLoader() {
  const token = useAccountStore.getState().accessToken;

  if (!token) throw redirect("/login");

  return null;
}
