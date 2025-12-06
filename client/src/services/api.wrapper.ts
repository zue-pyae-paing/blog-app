import useAccountStore from "../store/useAccountStore";

export const apiWrapper = async (url: string, options: RequestInit = {}) => {
  const { accessToken, refreshToken, setTokens, logout } =
    useAccountStore.getState();

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const refreshRes = await fetch(
      import.meta.env.VITE_SERVER_URI + "/auth/refresh-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!refreshRes.ok) {
      logout();
      throw new Error("Session expired");
    }

    const data = await refreshRes.json();
    setTokens(data.accessToken, data.refreshToken);

    const retryHeaders = {
      ...(options.headers || {}),
      Authorization: `Bearer ${data.accessToken}`,
    };

    return fetch(url, { ...options, headers: retryHeaders });
  }

  return response;
};
