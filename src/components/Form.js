// src/js/components/Form.js

import { fetchData, saveData } from "../db/db.config";
import { showSaveMessage } from "../utils/SaveMessage";

/**
 * 📝 Renderiza el formulario de registro de usuarios.
 * @param {HTMLElement} container - El contenedor donde se renderizará el formulario.
 */
export function renderForm(container) {
  const formHTML =
    /*html*/
    `
     <form id="registroForm" aria-label="Formulario de Registro">
    <label for="usuario" class="sr-only">Nombre de Usuario</label>
    <input 
    autocomplete="on"
      type="text" 
      id="usuario" 
      name="usuario" 
      autocomplete="username" 
      placeholder="Nombre de Usuario" 
      aria-describedby="usuario-help" 
      required
    >
    <small id="usuario-help" class="help-text">El nombre de usuario debe ser único.</small><br><br>

    <label for="contrasena" class="sr-only">Contraseña</label>
    <input 
      type="password" 
      id="contrasena" 
      name="contrasena" 
      autocomplete="on" 
      placeholder="Contraseña" 
      aria-describedby="contrasena-help" 
      required 
      minlength="6"
    >
    <small id="contrasena-help" class="help-text">La contraseña debe tener al menos 6 caracteres.</small><br><br>

    <label for="rol" class="sr-only">Rol</label>
    <select id="rol" name="rol" aria-label="Selecciona un rol">
      <option value="usuario">Usuario</option>
      <option value="admin">Administrador</option>
    </select><br><br>

    <button type="submit" aria-label="Registrar Usuario">✅ Registrar</button>
  </form>
  `;

  container.innerHTML += formHTML;

  document.getElementById("registroForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const usuario = formData.get("usuario").trim();
    const contraseña = formData.get("contrasena").trim();
    const rol = formData.get("rol");

    // Validar que el usuario no esté vacío
    if (!usuario || !contraseña) {
      alert("❌ Por favor, completa todos los campos.");
      return;
    }

    // Validar longitud mínima de la contraseña
    if (contraseña.length < 6) {
      alert("❌ La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      // Verificar si el usuario ya existe
      const existingUsers = await fetchData();
      const isDuplicate = existingUsers.some((doc) => doc.usuario === usuario);

      if (isDuplicate) {
        alert("❌ El usuario ya está registrado.");
        return;
      }

      // Guardar el nuevo usuario
      await saveData({
        _id: new Date().toISOString(),
        usuario,
        contraseña,
        rol,
        createdAt: new Date().toISOString(),
      });

      showSaveMessage();
      document.getElementById("registroForm").reset();
      location.reload(); // Recargar la página para actualizar la lista
    } catch (error) {
      console.error("🚨 Error en el formulario:", error);
      alert("❌ Error al registrar el usuario.");
    }
  });
}
