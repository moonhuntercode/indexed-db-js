// src/js/utils/renderData.js

/**
 * 📋 Renderiza los datos en la UI.
 * @param {Array} data - Lista de documentos recuperados de la base de datos.
 */
export function renderData(data) {
  const dataContainer = document.getElementById("data-container");

  // Limpiar el contenedor antes de renderizar nuevos datos
  dataContainer.innerHTML = "";

  if (data.length === 0) {
    dataContainer.innerHTML = "<p>No hay datos disponibles.</p>";
    return;
  }

  // Generar una lista de usuarios/documentos
  const list = data
    .map(
      (doc) => `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
          <strong>👤 Usuario:</strong> ${doc.usuario || "No especificado"}<br>
          <strong>👥 Rol:</strong> ${doc.rol || "No especificado"}<br>
          <strong>📅 Creado:</strong> ${new Date(doc.createdAt).toLocaleString()}<br>
          <button onclick="deleteDocument('${doc._id}', '${
        doc._rev
      }')">❌ Eliminar</button>
        </div>
      `
    )
    .join("");

  // Insertar la lista en el contenedor
  dataContainer.innerHTML += `<h2>Usuarios Registrados:</h2>${list}`;
}
