import type { LoginSchema, RegisterSchema } from "../schema/auth.schema";

export const getCategory = async () => {
  return await fetch(import.meta.env.VITE_SERVER_URI + "/blogs/category");
};

export const login = (data: LoginSchema) => {
  return fetch(import.meta.env.VITE_SERVER_URI + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const registerapi =  (data: RegisterSchema) => {
  console.log("env value", import.meta.env.VITE_SERVER_URI)
  return  fetch(import.meta.env.VITE_SERVER_URI + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
