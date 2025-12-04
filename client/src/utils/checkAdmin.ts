import { jwtDecode } from 'jwt-decode';
import useAccountStore from "../store/useAccountStore";

type JwtPayload = {
    id: string;
    role: string;
};

export const checkAdmin = () => {
    const accessToken = useAccountStore.getState().accessToken;
    if (!accessToken) return false;
    try {
        const decode = jwtDecode<JwtPayload>(accessToken);
        if (decode.role === "admin") return true;
    } catch (error) {
        return false;
    }
};