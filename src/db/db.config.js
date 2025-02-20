// src/db/db.config.js

import PouchDB from "pouchdb-browser";
import { log, logLevels } from "../utils/logger";

const db = new PouchDB("my-database");

export async function saveData(doc) {
  try {
    const response = await db.put(doc);
    log(logLevels.INFO, "Data saved successfully", { doc, response });
  } catch (error) {
    log(logLevels.ERROR, "Error saving data to PouchDB", { error });
    throw error;
  }
}

export async function fetchData() {
  try {
    const result = await db.allDocs({ include_docs: true });
    const data = result.rows.map((row) => row.doc);
    log(logLevels.INFO, "Data fetched successfully", { data });
    return data;
  } catch (error) {
    log(logLevels.ERROR, "Error fetching data from PouchDB", { error });
    throw error;
  }
}

export async function deleteData(doc) {
  try {
    const response = await db.remove(doc);
    log(logLevels.INFO, "Data deleted successfully", { doc, response });
  } catch (error) {
    log(logLevels.ERROR, "Error deleting data from PouchDB", { error });
    throw error;
  }
}

export async function deleteAllData() {
  try {
    const data = await fetchData();
    for (const doc of data) {
      await db.remove(doc);
    }
    log(logLevels.INFO, "Todos los datos han sido eliminados");
  } catch (error) {
    log(logLevels.ERROR, "Error al eliminar todos los datos", { error });
    throw error;
  }
}
