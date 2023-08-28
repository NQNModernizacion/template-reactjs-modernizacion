- [Configuración inicial](#configuración-inicial)
- [Build](#build)
- [Estilos](#estilos)

# Configuración inicial

1. Cambiar la configuracion del `package.json`

   ```json
   "name": "appname",
   "description": "descripción básica de la app",
   ```

<hr/>

2. Ejectuar `npm install`

<hr/>

3. Copiar el `.env.example` y generar `.env.local`, `.env.replica` y `.env.production`

<hr/>

1. Modificar el archivo `./index.html`

- content del meta tag con name "description":

  ```html
  <meta name="description" content="Template" />
  ```

- Contenido del title del proyecto

  ```html
  <title>Appname - Municipalidad de Neuquén</title>
  ```

<hr/>

5. Modificar el archivo `public/manifest.json`

   ```json
   "short_name": "Appname",
   "name": "Appname - Municipalidad Neuquén",
   ```

<hr/>

6. De ser necesario, borrar el archivo `public/web.config`

<hr />

# Build

- Réplica: `npm run build:replica`
- Producción: `npm run build`

<hr />

# Estilos

Por defecto los estilos son de Bootstrap 5. En caso de querer usar Tailwind CSS o alguna otra librería de estilos, comentar en el `index.html` los imports de bootstrap y agregar por paquete y/o cdn los que se vayan a usar
