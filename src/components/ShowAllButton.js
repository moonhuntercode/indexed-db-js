// src/js/components/ShowAllButton.js

import { fetchData } from "../db/db.config";
import { renderData } from "../utils/renderData";

/**
 * 📤 Agrega un botón para mostrar todos los documentos.
 * @param {HTMLElement} container - El contenedor donde se agregará el botón.
 */
export function addShowAllDocumentsButton(container) {
  const button = document.createElement("button");
  button.textContent = "📚 Mostrar Todos los Documentos";
  button.classList.add("show-all-docs-btn");

  button.addEventListener("click", async () => {
    try {
      const data = await fetchData();
      renderData(data);
      alert("✅ Todos los documentos han sido cargados.");
    } catch (error) {
      console.error("🚨 Error fetching all documents:", error);
      alert("❌ Error al cargar los documentos.");
    }
  });

  container.appendChild(button);
}
