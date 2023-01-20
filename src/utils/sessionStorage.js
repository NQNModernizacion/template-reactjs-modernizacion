const KEY = window.location.origin

export const getSession = () => JSON.parse(sessionStorage.getItem(KEY))

export const getSessionKey = () => getSession()?.value.authenticationToken
export const getUserName = () => getSession()?.value.userName
export const getUserId = () => getSession()?.value.referenciaID
export const getEmail = () => getSession()?.value.datosPersonales.correoElectronico
export const getApps = () => getSession()?.value.apps

export const viewSession = () => console.log(getSession());

export const isTimeInvalid = () => new Date().getTime() > getSession()?.expiry

const s = '{"value":{"screen":"loggedIn","profile":{"wapUsuarioID":20936,"correoElectronico":"gon.pineiro@gmail.com","celular":1126410253,"razonSocial":"PIÑEIRO ALEMAN URQUIZA, GONZALO","documento":31960202,"fechaNacimiento":"1991-08-02T00:00:00Z","genero":{"id":0,"textID":"M","value":"MASCULINO"},"domicilioLegal":{"direccion":"PINAR 572 1 AREA CENTRO","barrio":"","codigoPostal":{"postalID":8300,"ciudad":"NEUQUÉN CAPITAL","departamento":"CONFLUENCIA","provincia":"NEUQUÉN","pais":"ARGENTINA"},"ubicacion":null,"deployed":null},"domicilioReal":{"direccion":"PINAR 572 1 AREA CENTRO","barrio":"","codigoPostal":{"postalID":8300,"ciudad":"NEUQUÉN CAPITAL","departamento":"CONFLUENCIA","provincia":"NEUQUÉN","pais":"ARGENTINA"},"ubicacion":null,"deployed":null},"urlImagen":null},"loading":true,"authenticationToken":"3mao3L9vOhBEec43zAitGZk8jPHx19NPU5Nx95i2xAXK09rg964E7kQibvJCAtb3O4PDxGhCw6oL63r7kXSHvqXEy4QExALLEi17gZ1hbiZlNx7kS0PkEWBAB1CDGJhm0EViyPzbe0IAB7CDAB1CD9BFsSNcFTvelAGkYpTKl3RAB1CD","apps":{"list":[],"apps":0,"folders":0},"procedures_started":{"legajo":{"fetch":true,"loading":true,"error":null},"libreta":{"fetch":true,"loading":true,"error":null},"licencia_comercial":{"fetch":true,"loading":true,"error":null},"licencia":{"fetch":true,"loading":true,"error":null},"acarreo":{"fetch":false},"muniEventos":{"fetch":true,"loading":true,"error":null},"libretaDos":{"fetch":true,"loading":true,"error":null}}},"expiry":1674235792366}'

export const setSession = () => sessionStorage.setItem(KEY, s);