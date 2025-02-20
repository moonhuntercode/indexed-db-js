// src/utils/logger.js

export const logLevels = {
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

export function log(level, message, details = {}) {
  const logEntry = {
    level,
    message,
    details,
    timestamp: new Date().toISOString(),
  };

  // Mostrar el log en la consola
  console.log(`[${level}] ${message}`, details);

  // Guardar el log en localStorage
  saveLogToLocalStorage(logEntry);

  // Opcional: Enviar el log a un servidor (descomenta si lo necesitas)
  // sendLogToServer(logEntry);
}

function saveLogToLocalStorage(logEntry) {
  const logs = JSON.parse(localStorage.getItem("appLogs")) || [];
  logs.push(logEntry);
  localStorage.setItem("appLogs", JSON.stringify(logs));
}

function sendLogToServer(logEntry) {
  // Implementa aquí el envío de logs a un servidor
  // Por ejemplo, usando fetch:
  /*
  fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logEntry),
  }).catch((error) => {
    console.error('Failed to send log to server:', error);
  });
  */
}
