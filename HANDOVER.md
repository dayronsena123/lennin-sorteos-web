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

## 5. 💰 Lista de Compras (Presupuesto para el Cliente)
Para que la página funcione profesionalmente y no se caiga, esto es lo que debe pagar el cliente:

### A. Pago Único / Anual
*   **Dominio (.com):** Aprox. **$12 - $15 USD al año**.
    *   *Dónde:* GoDaddy, Namecheap o Vercel.
    *   *Por qué:* Para que se llame `lenninsorteos.com`.

### B. Pagos Mensuales (Solo meses de sorteo)
Si la página va a tener tráfico real y gente comprando tickets, **NO uses lo gratis**. Se caerá o será lenta.

1.  **Servidor (Render - Plan Starter):** **$7 USD / mes**.
    *   *Por qué:* Para que la página cargue rápido siempre (sin esperar 50s).
    *   *Truco:* Cuando acabe el sorteo (ej. Enero), puedes volver al plan "Free" para no pagar hasta el siguiente sorteo.

2.  **Base de Datos (Railway):** **$5 USD / mes** (aprox).
    *   *Por qué:* Para guardar los tickets de forma segura.
    *   *Nota:* Railway cobra por uso. Si nadie entra, cobran centavos. Pero necesitas poner una tarjeta para que no la borren.

### 💵 Resumen Total
*   **Costo Fijo Anual:** ~$15 USD (Dominio).
*   **Costo Mensual (Mes de Sorteo):** ~$12 USD (Render + Railway).
*   **Costo Mensual (Meses Muertos):** ~$0 - $2 USD (Si bajas Render a Free).

### 💡 ¿Quieres pagar 1 vez al año? (Como un Hosting clásico)
Si a tu cliente no le gusta pagar cada mes, haz esto:

1.  **En Railway:** Compra **$60 USD de créditos** de una sola vez.
    *   Eso se quedará en la cuenta y se irá gastando poco a poco (aprox. $5/mes).
    *   **Resultado:** ¡Pagas hoy y no vuelves a pagar hasta el próximo año! Es lo mismo que un hosting anual, pero con mejor tecnología.

2.  **En Render:** Si usas el plan Free, es gratis. Si usas el Starter, también puedes poner tarjeta, pero Render no tiene "bolsa de créditos" igual. Lo mejor es usar Free en meses muertos y pagar los $7 solo el mes del sorteo.

---

## 6. 🛠️ Estrategia "Sorteos por Temporada"
Como dices que los sorteos son por fechas (Navidad, Día de la Madre, etc.), haz esto para ahorrar dinero:

1.  **Mes del Sorteo (Activo):**
    *   Paga los $7 en Render.
    *   Asegúrate que Railway tenga crédito.
    *   La página volará 🚀.

2.  **Meses sin Sorteo (Inactivo):**
    *   Entra a Render -> Settings -> Instance Type -> Cmbia a **"Free"**.
    *   La página seguirá existiendo, pero será un poco más lenta al abrir la primera vez. ¡Pero es gratis!
    *   **NO borres nada**, solo baja el plan.

---

## 7. ❓ Preguntas Frecuentes (Lo que debes saber)

### ¿Cuántos tickets pueden registrarse?
*   **En Railway ($5/mes):** Tienes espacio para **miles y miles de tickets** (cientos de miles). No te vas a quedar sin espacio por un sorteo normal.
*   **Límite Real:** El límite no es la cantidad de tickets, sino cuánta gente entra *al mismo tiempo*. Si entran 1000 personas en el mismo segundo, el plan básico podría ponerse lento, pero no se caerá.

### ¿Qué pasa si NO pago Render y uso el Gratis?
*   **Funciona:** Sí, la página funcionará.
*   **El Riesgo:** Si nadie entra en 15 minutos, el servidor se "apaga". Cuando entre el siguiente cliente, la página se quedará en blanco cargando por **50 segundos**.
*   *¿Es grave?* Para un negocio serio, sí. El cliente pensará que la página está malograda. Por eso recomiendo pagar los $7 solo el mes del sorteo.

### ¿Vercel cobra?
*   **No.** Para este tipo de páginas, Vercel es gratis y muy generoso. Solo cobra si tienes millones de visitas.

---

## 8. 🗣️ Guión para tu Cliente (Qué decirle)
*"Jefe, para que el sistema sea seguro y no se caiga, usamos servidores en la nube de alta tecnología (como los que usa Uber o Netflix a pequeña escala)."*

*"No es un hosting barato antiguo que se cuelga. Aquí pagamos por lo que usamos:"*
1.  **Dominio:** $15 al año (su nombre .com).
2.  **Servidor:** Le ponemos una recarga de $60 de saldo y con eso nos olvidamos del pago mensual por un buen tiempo. Es como ponerle gasolina al auto: lo llenamos hoy y nos dura todo el año.*"

---

## ✅ Checklist Final para el Cliente
- [ ] Cambiar `ADMIN_EMAIL` y `ADMIN_PASSWORD` en Render.
- [ ] Comprar dominio `.com` y conectarlo en Vercel.
- [ ] (Opcional pero recomendado) Actualizar Render a plan "Starter" ($7) para evitar lentitud.
- [ ] Probar registro de ticket y acceso admin con los nuevos datos.
