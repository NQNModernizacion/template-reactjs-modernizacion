const KEY = window.location.origin;

export const getSession = () => JSON.parse(sessionStorage.getItem(KEY));

export const getToken = () => getSession()?.token;

export const viewSession = () => console.log(getSession());

export const isTimeInvalid = () => new Date().getTime() > getSession()?.expiry;

export const setSession = (s) => {
  sessionStorage.setItem(KEY, JSON.stringify(s));
};

export const isValidSession = () => {
  const valid = new Date().getTime() < getSession()?.expires_in;

  if (!valid) {
    sessionStorage.removeItem(KEY);
  }

  return valid;
};

/** Genera un intervalo para analizar la session */
// export const intervalSession = (expires_in) => {
//     const inter = setInterval(() => {
//         if (expires_in - new Date().getTime() < 0) {
//             logout()
//             clearInterval(inter)
//         }
//     }, 180000);
// }
