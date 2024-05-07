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
    await db.put({ _id: id, input, out });
}

/**
 * Clear History: Resets database for entirely new translations
 * 
 * @async
 * @throws Error - if there's a problem accessing the database
 */
export async function clearTranslationHistory() {
    db.remove()
}

/**
 * Loads translation history
 * 
 * @async
 * @param {number} n - represents loading the n most recent documents
 * @returns Promise<> - resolves to translation history if any
 * @throws Error - if there's a problem accessing the database
 */