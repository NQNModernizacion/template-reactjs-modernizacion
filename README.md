# template-reactjs-modernizacion

1) Cambiar la configuracion del `package.json`

    ```json
    "name": "template-reactjs-modernizacion",
    "homepage": "/apps/TEMPLATE",
    "description": "Témplate básico de RactJS",
    ```
    
<hr/>

2) Ejectuar `npm install`

<hr/>

3) Copiar el `.env` y generar `.env.development` y `.env.production`

<hr/>

4) Modificar el archivo `public/index.html`

- content del meta tag con name "description":

    ```html
    <meta name="description" content="Template" />
    ```
- Contenido del title del proyecto

    ```html
    <title>Template</title>
    ```

<hr/>

5) Modificar el archivo `public/manifest.json`

    ```json
    "short_name": "Template",
    "name": "Template - Municipalidad de Neuquén"
    ```

<hr/>

6) De ser necesario, borrar el archivo `public/web.config`

<hr/>

# Custom hooks
## useFetch
El hook se encuentra dentro de `src/hooks/useFetch`.
Para personalizar el hook se debe editar `useFetch.ts`.
En caso de querer modificar los tipos de headers y métodos se debe ingresar a `config.ts`.
Por cualquier cosa esos archivos cuentan con explicaciones detalladas de cómo editarlos.
### Parámetros
- `url`: endpoint al que se va a apuntar
- `method`: método http que se va a usar. Por defecto están GET, POST y PATCH
- `headerType`: tipo de header que se va a usar. La principal diferencia radica en si se utiliza auth con un token o no.
- `body`: objeto js ya transformado en JSON o un FormData (en caso de FormData revisar los headers predefinidos).

### Retorno
El hook cuenta con un objeto con 3 estados predefinidos:
- `data`: información devuelta por el endpoint consultado.
- `error`: error que se puede haber seteado en caso de un problema en la comunicación (si no hay ninguno está `null`).
- `loading`: se utiliza para renderizar un spinner o algún tipo de carga mientras se hace la consulta.

Se puede modificar el hook para que también retorne las funciones que setean los estados. 

### Manejo de errores
El manejo de errores no está implementado más allá de una catch en el fetch. Por ende si se quiere personalizar hay que modificar el archivo.