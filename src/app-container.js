// src/js/app-container.js

import { setupGlobalErrorHandlers } from "./utils/errorHandler";
import { log, logLevels } from "./utils/logger";
import { fetchData } from "./db/db.config";
import { renderData } from "./utils/renderData";
import { renderForm } from "./components/Form.js";
import { addShowAllDocumentsButton } from "./components/ShowAllButton";

/**
 * 🚀 Inicializa la aplicación.
 * - Configura manejadores globales de errores.
 * - Carga los datos iniciales y renderiza la UI.
 */
async function initApp() {
  try {
    // Configurar manejadores globales de errores
    setupGlobalErrorHandlers();

    // Cargar datos desde la base de datos
    const data = await fetchData();
    renderData(data);

    // Renderizar el formulario y botones adicionales
    const formContainer = document.getElementById("form-container");
    const dataContainer = document.getElementById("data-container");

    renderForm(formContainer);
    addShowAllDocumentsButton(dataContainer);
  } catch (error) {
    log(logLevels.ERROR, "Failed to initialize app", { error });
    alert("❌ Error al cargar la aplicación.");
  }
}

// Inicializar la aplicación
initApp();
