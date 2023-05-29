import { toast } from 'react-toastify';

import { toastOptions } from '../../config/toast';

import { axios } from "../../utils/axios";

window.addEventListener("popstate", function (event) {
  window.history.pushState(null, document.title, window.location.href);
});

export const handleLogin = async (e, actions, body, nav) => {
  e.preventDefault();

  actions.setLoading(true);

  const response = await axios().post("internal_login", body);
  const { data, error } = response.data;

  if (data) {
    actions.setUser(data);
    nav(`/`);
  }

  if (error) {
    /* Guardamos en los errores del contexto y lo mostramos con un popup */
    toast.error(error, toastOptions)
    actions.setLoading(false);
  }
};
