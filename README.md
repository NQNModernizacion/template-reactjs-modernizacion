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

3) Copiar el `.env` y generar `.env.development` y `.env.production` y configurarlos.

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

7) Cambiar el titulo del Componente `/src/screens/Login/index.jsx`

