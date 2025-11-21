# Guía Rápida de Git (Para actualizar tu código)

Cada vez que hagas cambios en tu PC (como editar el README, cambiar colores, arreglar algo), sigue estos 3 pasos sagrados en tu terminal:

## 1. Guardar cambios (Staging)
Esto le dice a Git: "Oye, quiero incluir estos archivos en la próxima subida".
```powershell
git add .
```
*(El punto `.` significa "todos los archivos modificados". Si solo quieres uno específico, usa `git add nombre_del_archivo`)*

## 2. Confirmar cambios (Commit)
Esto guarda una "foto" de tus cambios con una etiqueta.
```powershell
git commit -m "Escribe aquí qué hiciste"
```
*Ejemplo: `git commit -m "Cambié el título del README"`*

## 3. Subir a la nube (Push)
Esto envía tus cambios confirmados a GitHub.
```powershell
git push
```

---

### Resumen para copiar y pegar:
```powershell
git add .
git commit -m "Actualización"
git push
```

### ¿Cómo saber si hay cambios pendientes?
Si no estás seguro de si tienes algo por subir, escribe:
```powershell
git status
```
- **Rojo:** Cambios no guardados (falta `git add`).
- **Verde:** Cambios listos para confirmar (falta `git commit`).
- **"Your branch is ahead of 'origin/main'":** Falta subir (falta `git push`).
