# Guía de Despliegue - Lennin Sorteos

Esta guía te llevará paso a paso para subir tu proyecto a internet.

## 1. Preparativos (GitHub)

Antes de subir nada, necesitamos un lugar donde guardar tu código en la nube.

1.  **Crear Cuenta**: Ve a [github.com](https://github.com/) y crea una cuenta (si no tienes una).
2.  **Crear Repositorio**:
    *   Haz clic en el botón **+** (arriba a la derecha) -> **New repository**.
    *   Nombre: `lennin-sorteos-web`.
    *   Público/Privado: Elige **Public** (es más fácil para empezar).
    *   **NO** marques "Add a README file".
    *   Haz clic en **Create repository**.
3.  **Copiar Link**: Verás una pantalla con instrucciones. Copia el link que termina en `.git` (ejemplo: `https://github.com/tu-usuario/lennin-sorteos-web.git`).

## 2. Subir el Código (Desde tu PC)

Yo te ayudaré con los comandos, pero el proceso es este:

1.  Abriremos la terminal en tu proyecto.
2.  Conectaremos tu carpeta local con el repositorio de GitHub que acabas de crear.
3.  Enviaremos todos los archivos a la nube.

## 3. Backend (Render) - El Cerebro

Aquí subiremos el servidor (Node.js) y la base de datos.

1.  Ve a [render.com](https://render.com/) y crea una cuenta (puedes usar tu cuenta de GitHub).
2.  **Base de Datos (MySQL)**:
    *   Click en **New +** -> **MySQL**.
    *   Name: `lennin-db`.
    *   Plan: **Free**.
    *   Click **Create Database**.
    *   **IMPORTANTE**: Copia el `Internal DB URL` y el `External DB URL`. Guárdalos en un bloc de notas.
3.  **Servidor (Web Service)**:
    *   Click en **New +** -> **Web Service**.
    *   Conecta tu cuenta de GitHub y selecciona el repositorio `lennin-sorteos-web`.
    *   Name: `lennin-backend`.
    *   Root Directory: `backend`.
    *   Build Command: `npm install`.
    *   Start Command: `node server.js`.
    *   Plan: **Free**.
    *   **Environment Variables** (Variables de Entorno):
        *   `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Usa los datos de la base de datos que creaste en el paso anterior.
        *   `PORT`: `10000` (Render usa este puerto por defecto).
    *   Click **Create Web Service**.

## 4. Frontend (Vercel) - La Cara

Aquí subiremos la página web (React).

1.  Ve a [vercel.com](https://vercel.com/) y crea una cuenta (con GitHub).
2.  Click en **Add New...** -> **Project**.
3.  Importa el repositorio `lennin-sorteos-web`.
4.  **Configuración**:
    *   Framework Preset: **Vite**.
    *   Root Directory: Click en `Edit` y selecciona la carpeta `frontend`.
    *   **Environment Variables**:
        *   `VITE_API_URL`: Aquí pegas la URL que te dio Render para tu backend (ejemplo: `https://lennin-backend.onrender.com`). **OJO**: Sin la barra `/` al final.
5.  Click **Deploy**.

## 5. ¡Listo!

Vercel te dará un link (ejemplo: `https://www.lenninsorteos.com`). ¡Esa es tu página web en vivo!
