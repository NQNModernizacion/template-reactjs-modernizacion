- [Configuración inicial](#configuración-inicial)
  - [Variables de entorno](#variables-de-entorno)
- [Build](#build)
- [Estilos](#estilos)

# Configuración inicial
1) Cambiar la configuracion del `package.json`

    ```json
    "name": "template-reactjs-modernizacion",
    "homepage": "/apps/TEMPLATE",
    "description": "Témplate básico de ReactJS",
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

<hr />

## Variables de entorno
Se deben crear 3 archivos de variables de entorno:
- `.env.production`
- `.env.development`
- `.env.staging` (En este es donde se configura para el entorno de desarrollo local)

# Build
- Local: `npm run build-local`
- Réplica: `npm run build-dev`
- Producción: `npm run build`

# Estilos
Por defecto los estilos son de Bootstrap 5. En caso de querer usar Tailwind CSS o alguna otra librería de estilos, comentar en el `index.html` los imports de bootstrap y agregar por paquete o cdn los que se vayan a usar