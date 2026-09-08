//Patitas en Casa

Aplicación web para registrar solicitudes de adopción de mascotas. Está construida con Node.js, Express, Handlebars y MongoDB mediante Mongoose.

//Funcionalidades

- Vista principal con formulario de adopción (`GET /`).
- Registro de nombre, correo, teléfono, tipo de mascota, experiencia y mensaje.
- Persistencia de solicitudes en la colección `adoptions` de MongoDB (`POST /adopciones`).
- Confirmación después de guardar (`GET /gracias`).
- Endpoint de salud para Render (`GET /salud`).

// Ejecutar localmente

1. Instala Node.js 18 o superior y asegúrate de tener una instancia de MongoDB disponible.
2. Instala dependencias:

   ```bash
   npm install
   ```

3. Copia `.env.example` como `.env` y configura `MONGODB_URI`.
4. Inicia la aplicación:

   ```bash
   npm start
   ```

   Para desarrollo con reinicio automático: `npm run dev`.

La aplicación quedará disponible en `http://localhost:3000`.

## GitHub

Crea un repositorio vacío en GitHub y ejecuta desde la raíz del proyecto:

```bash
git init
git add .
git commit -m "Crear aplicación de adopción"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

`.gitignore` excluye `node_modules`, `.env` y archivos generados. Nunca publiques las credenciales de MongoDB.

//Despliegue en Render

1. Crea una base de datos en MongoDB Atlas y permite las conexiones desde Render.
2. En Render, selecciona **New > Web Service** y conecta el repositorio de GitHub.
3. Usa estos valores:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Añade la variable de entorno `MONGODB_URI` con la cadena de conexión de Atlas.
5. Render asigna automáticamente `PORT`; la aplicación ya la utiliza.
6. Como health check opcional, configura la ruta `/salud`.
