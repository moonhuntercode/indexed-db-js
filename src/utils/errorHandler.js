// src/utils/errorHandler.js

import { log, logLevels } from "./logger";

/**
 * Configura manejadores globales de errores.
 */
export function setupGlobalErrorHandlers() {
  // Captura errores globales (sintaxis, referencias no definidas, etc.)
  window.onerror = (message, source, lineno, colno, error) => {
    console.error("Global Error:", { message, source, lineno, colno, error });
    log(logLevels.ERROR, "Global Error", { message, source, lineno, colno, error });
    return true; // Evita que el navegador muestre el error por defecto
  };

  // Captura promesas rechazadas no manejadas
  window.onunhandledrejection = (event) => {
    console.error("Unhandled Rejection:", event.reason);
    log(logLevels.ERROR, "Unhandled Rejection", { reason: event.reason });
  };
}
