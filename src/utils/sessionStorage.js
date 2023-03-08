const KEY = window.location.origin

export const getSession = () => JSON.parse(sessionStorage.getItem(KEY))

export const getToken = () => getSession()?.token

export const viewSession = () => console.log(getSession());

export const isTimeInvalid = () => new Date().getTime() > getSession()?.expiry

export const setSession = (s) => {
    sessionStorage.setItem(KEY, JSON.stringify(s))
};