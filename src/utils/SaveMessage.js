// src/js/utils/SaveMessage.js

/**
 * ✅ Muestra un mensaje flotante de confirmación.
 * Este mensaje aparece cuando se guarda un usuario correctamente.
 */
export function showSaveMessage() {
  const messageContainer = document.createElement("div");
  messageContainer.id = "save-message";
  messageContainer.style.position = "fixed";
  messageContainer.style.bottom = "20px";
  messageContainer.style.right = "20px";
  messageContainer.style.padding = "10px";
  messageContainer.style.backgroundColor = "#4caf50";
  messageContainer.style.color = "#fff";
  messageContainer.style.borderRadius = "5px";
  messageContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
  messageContainer.textContent = "✅ Usuario y contraseña guardados correctamente";

  document.body.appendChild(messageContainer);

  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    document.body.removeChild(messageContainer);
  }, 3000);
}
