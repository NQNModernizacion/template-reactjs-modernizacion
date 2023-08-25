import { logout } from "../../../utils/auth/sessionStorage";

export const closeSession = () => {
  logout();
};
