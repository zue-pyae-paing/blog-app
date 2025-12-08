import useAccountStore from "../store/useAccountStore";

export const apiWrapper = async (url: string, options: RequestInit = {}) => {
  const store = useAccountStore.getState();
  let { accessToken, refreshToken } = store;

  console.log(refreshToken,'this is refresh tokne soter ')
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  let response = await fetch(url, { ...options, headers });

  // Token expired -> try to refresh
  if (response.status === 401 && refreshToken) {
    console.log(refreshToken,'this is refresh token')
    const refreshRes = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({refreshToken: refreshToken }),
      }
    );

    if (!refreshRes.ok) {
      store.logout();
      return response;
    }

    const { data } = await refreshRes.json();

    store.setTokens(data.accessToken, data.refreshToken);

    const retryHeaders = {
      ...(options.headers || {}),
      Authorization: `Bearer ${data.accessToken}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };

    return fetch(url, { ...options, headers: retryHeaders });
  }

  return response;
};
