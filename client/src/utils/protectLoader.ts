// src/utils/protectLoader.ts
import { redirect } from "react-router";
import useAccountStore from "../store/useAccountStore";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export async function protectLoader() {
  const token = useAccountStore.getState().accessToken;
  if (!token) throw redirect("/login");

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp * 1000 < Date.now()) throw redirect("/login");
  } catch {
    throw redirect("/login");
  }

  return null;
}
