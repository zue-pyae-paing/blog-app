import useAccountStore from "../store/useAccountStore";

export const getHeaders=()=>{
    const accessToken = useAccountStore.getState().accessToken;
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
}