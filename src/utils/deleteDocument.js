// src/js/utils/deleteDocument.js

import { deleteData } from "../db/db.config";

/**
 * 🗑️ Elimina un documento de la base de datos.
 * @param {string} id - ID del documento.
 * @param {string} rev - Revisión del documento.
 */
export async function deleteDocument(id, rev) {
  try {
    const doc = { _id: id, _rev: rev };
    await deleteData(doc);
    alert("✅ Documento eliminado exitosamente.");
    location.reload(); // Recargar la página para refrescar los datos
  } catch (error) {
    console.error("🚨 Error deleting document:", error);
    alert("❌ Error al eliminar el documento.");
  }
}

// Exponer la función al ámbito global para usarla en el HTML
window.deleteDocument = deleteDocument;
