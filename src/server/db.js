import PouchDB from "pouchdb";

const db = new PouchDB("translation-history");

/**
 * FUNCTIONS ACCESSING DATABASE:
 * - updates history
 * - clears history
 * - gets history
 */

/**
 * History Update: updates history with the current translation.
 * 
 * @async
 * @param {number} id - The ordered number of translation
 * @param {string} input - The text input of what we wanted translated
 * @param {string} out - The result of the translation
 * @throws Error - if there's a problem accessing the database
 */

export async function saveTranslation(id, input, out) {
    try {
        await db.put({ _id: id, input, out });
    }
    catch {
        throw new Error(`Error storing history of input ${input}: ${error}`)
    }
}

/**
 * Clear History: Resets database for entirely new translations
 * 
 * @async
 * @throws Error - if there's a problem accessing the database
 */
export async function clearTranslationHistory() {
    try {
        const allDocs = await db.allDocs();
        const forRemoval = docs.rows.map(row => ({
            _id: row.id,
            _rev: row.value.rev,
            _deleted: true
        }));
        await db.bulkDocs(docsToRemove);
    }
    catch {
        throw new Error(`Error deleting documents from database: ${error}`);
    }
}

/**
 * Loads translation history
 * 
 * @async
 * @param {number} n - represents loading the n most recent documents
 * @returns Promise<> - resolves to translation history if any
 * @throws Error - if there's a problem accessing the database
 */
export async function loadHistory(n) {
    try {
        const result = await db.allDocs({ include_docs: true, descending: true, limit: n });
        return result.rows.map(row => row.doc);
    } catch (error) {
        throw new Error(`Error loading documents from database: ${error}`);
    }
}