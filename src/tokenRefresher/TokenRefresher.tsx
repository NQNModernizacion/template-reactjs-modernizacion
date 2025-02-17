import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserWrapper";
import { axios } from "../utils/axios";
import { WEBLOGIN_URL } from "../config";


export default function TokenRefresher() {
    const { actions } = useContext(UserContext)

    useEffect(() => {
        if (actions.token() != null) {
            const interval = setInterval(async () => {
                const response = await axios().post('auth', { type: "refresh_token" });
                const { data, error } = response.data;
                if (data && !error) {
                    actions.setStore(data);
                }
                if (error && !data) {
                    const KEY = window.location.origin as string
                    localStorage.removeItem(KEY)
                    window.location.href = WEBLOGIN_URL
                }
            }, 40 * 60 * 1000);

            return () => clearInterval(interval);
        }

    }, [actions])

    return null;
}