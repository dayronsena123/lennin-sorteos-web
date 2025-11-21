#  Manual de Entrega y Puesta en Marcha - Lennin Sorteos

Este documento contiene todo lo necesario para gestionar, configurar y asegurar el funcionamiento del proyecto en producción.

## 1.  Cambiar Credenciales de Administrador (Correo y Contraseña)
Actualmente, el sistema usa el correo y contraseña de desarrollo. Para cambiarlos por los del cliente, **NO necesitas tocar el código**. Se hace desde el panel de control de Render.

1.  Entra a [dashboard.render.com](https://dashboard.render.com/).
2.  Selecciona tu servicio: **`lennin-backend`**.
3.  Ve a la pestaña **"Environment"** (Variables de Entorno).
4.  Busca las variables:
    *   `ADMIN_EMAIL`
    *   `ADMIN_PASSWORD`
5.  Dale al botón **"Edit"** (lápiz) en cada una y pon los datos nuevos del cliente.
6.  Click en **"Save Changes"**.
7.  El servidor se reiniciará automáticamente. ¡Listo!

---

## 2.  Configurar Dominio Personal (Lenninsorteos.com)
Para que la página tenga un nombre profesional (`.com`), sigue estos pasos:

### Paso A: Comprar el Dominio
Compra el dominio en proveedores como **GoDaddy**, **Namecheap** o el mismo **Vercel**.

### Paso B: Conectar a Vercel
1.  Entra a [vercel.com](https://vercel.com/) y ve a tu proyecto **`lennin-sorteos-web`**.
2.  Ve a la pestaña **"Settings"** -> **"Domains"**.
3.  Escribe el dominio (ej: `lenninsorteos.com`) y dale a **Add**.
4.  Vercel te dará unos valores DNS (normalmente un registro `A` o `CNAME`).
5.  Ve a donde compraste el dominio (GoDaddy/Namecheap) y agrega esos registros DNS.
6.  Espera unos minutos (a veces horas) y Vercel te mostrará el dominio en verde. ✅

---

## 3. Estabilidad y "Que no se caiga" (IMPORTANTE)
Actualmente estás usando los **Planes Gratuitos** de Render y Railway. Tienen limitaciones que debes conocer para un sorteo real.

### El Problema del "Sueño" (Cold Start)
*   **Render Free:** Si nadie entra a la página en 15 minutos, el servidor se "duerme".
*   **Consecuencia:** La próxima persona que entre tendrá que esperar **~50 segundos** a que cargue. Parece que la página está rota, pero solo está "despertando".

### La Solución (Recomendada para el Lanzamiento)
Para el día del sorteo o cuando empiece la publicidad, te recomiendo pagar el plan básico de Render:
1.  En Render, ve a **"Settings"** -> **"Instance Type"**.
2.  Cambia de "Free" a **"Starter"** (aprox. $7 USD/mes).
3.  Esto mantendrá el servidor **siempre despierto** y rápido.
4.  *Puedes cancelar el pago cuando termine el sorteo.*

### Base de Datos (Railway)
*   Railway da $5 de crédito gratis (dura bastante para pruebas).
*   Para producción real, vigila que no se acaben los créditos o vincula una tarjeta para pagar solo lo que consumas (suele ser muy barato, menos de $5 al mes para este tráfico).

---

## 4.  Resumen de Enlaces
*   **Frontend (Página Web):** `https://lennin-sorteos-web.vercel.app` (o tu `.com` cuando lo pongas).
*   **Backend (Servidor):** `https://lennin-backend.onrender.com`
*   **Panel Admin:** Agrega `/admin` a tu web (ej: `lenninsorteos.com/admin`).

---

##  Checklist Final para el Cliente
- [ ] Cambiar `ADMIN_EMAIL` y `ADMIN_PASSWORD` en Render.
- [ ] Comprar dominio `.com` y conectarlo en Vercel.
- [ ] (Opcional pero recomendado) Actualizar Render a plan "Starter" ($7) para evitar lentitud.
- [ ] Probar registro de ticket y acceso admin con los nuevos datos.
