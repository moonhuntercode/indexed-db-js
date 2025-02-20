const dbName = "UsuariosDB";
const storeName = "Usuarios";

export function abrirBaseDeDatos() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.error("Error al abrir la base de datos:", event);
      reject("Error al abrir la base de datos");
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      db.onerror = (event) => {
        console.error("Error en la base de datos:", event);
      };
      resolve(db);
    };
  });
}

export async function agregarUsuario(usuario, contraseña, rol) {
  try {
    const contraseñaHasheada = contraseña; // Simulación
    const db = await abrirBaseDeDatos();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add({ usuario, contraseña: contraseñaHasheada, rol });

    request.onsuccess = () => {
      console.log("Usuario agregado correctamente:", usuario);
    };

    request.onerror = (event) => {
      console.error("Error al agregar usuario:", event);
      throw new Error("Error al agregar usuario");
    };
  } catch (error) {
    console.error("Error en agregarUsuario:", error);
    throw error;
  }
}
