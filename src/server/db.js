import PouchDB from "pouchdb";

// this is for history
const db = new PouchDB("translation-history");
// this is for the game
const db_words = new PouchDB("translation-words");

/**
 * FUNCTIONS ACCESSING DATABASE:
 * - nextID
 * - saveTranslation
 * - deleteTranslation
 * - clearTranslationHistory
 * - findTranslation
 * - loadHistory
 * 
 * - TODO: break up sentences into words and update translation-words
 */

/**
 * Determines the next free id number for storage
 * 
 * @async
 * @param {boolean} words - whether we're finding the id of words database or translation
 * @returns {number} id - next available id in database
 */
async function nextID(words = false) {
    // retrieves most recent document
    const lastTranslation = await db.allDocs({
        include_docs: true,
        descending: true,
        limit: 1
    });
    
    // Determines the next id number, deals with no translation issue
    let id = 0;
    if (lastTranslation.rows.length > 0) {
        id = lastTranslation.rows[0].doc._id + 1;
    }

    return id
}

/**
 * History Create: updates history with the current translation.
 * 
 * @async
 * @param {string} input - The text input of what we wanted translated
 * @param {string} out - The result of the translation
 * @param {string} lang_in - the starting language
 * @param {string} lang_out - the result language 
 * @throws Error - if there's a problem accessing the database
 */

export async function saveTranslation(input, out, lang_in, lang_out) {
    try {
        //if translation already exists, we delete it
        const id_curr = findTranslation(input, lang_in);
        if (id_curr !== -1) {
            deleteTranslation(id_curr);
        }
        
        //gets next available id
        const id = await nextID()
        
        //stores
        await db.put({ _id: id, input, out, lang_in, lang_out });
    }
    catch (error){
        throw new Error(`Error storing history of input ${input}: ${error}`)
    }
}


/**
 * Clear Translation: removes a translation. This is typically done when the user enters a duplicate translation.
 * 
 * @async
 * @param {number} id - the id of the document to be marked as deleted
 * @throws Error - if the ID is not found
 */
async function deleteTranslation(id) {
    try {
        const doc = await db.get(id);
        await db.remove(doc);
    } catch (err) {
        console.log(`Error removing document id=${id}: ${err}`)
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
        const forRemoval = allDocs.rows.map(row => ({
            _id: row.id,
            _rev: row.value.rev,
            _deleted: true
        }));
        await db.bulkDocs(forRemoval);
    }
    catch (error){
        throw new Error(`Error deleting documents from database: ${error}`);
    }
}

/**
 * Searches history for current translation. The goal is to find a duplicate translation to 
 * update the id number in a different function
 * 
 * @param {string} input - the translation input
 * @param {string} lang_in - the input language
 * 
 * @returns {number} id - the id of the translation, -1 if not found
 */
async function findTranslation(input, lang_in) {
    try {
        const query = {
            "input": input,
            "lang_in": lang_in
        };

        const result = await db.find({ selector: query });

        if (result.docs.length > 0) {
            //if found
            return result.docs[0]._id;
        } 
        else {
            // if not found
            return -1;
        }

    } catch (error) {
        console.error("Error searching translation history:", error);
        // if error
        return -1;
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

        if (result.rows.length < n) {
            console.log(`database only contains ${result.rows.length} instead of ${n}`);
        }

        return result.rows.map(row => row.doc);
    } 
    catch (error) {
        throw new Error(`Error loading documents from database: ${error}`);
    }
}

/** NOT IMPLEMENTED
 * Splits up phrases from translation-history and updates translation-words
 * 
 * @async
 * @param {string} input - the translation input
 * @param {string} lang_in - the input language
 * @throws Error - if there's a problem accessing the database
 */
export async function updateWords(input, lang_in) {
    try {
        const query = {
            "input": input,
            "lang_in": lang_in
        };

        const result = await db.find({ selector: query });

        if (result.docs.length > 0) {
            //if found
            const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;

            const in_words = result.docs[0].input.split(" ");
            in_words = in_words.map((word) => {
                return word.replace(punctuation, "");
            });
            
            const out_words = result.docs[0].out.split(" ");
            out_words = out_words.map((word) => {
                return word.replace(punctuation, "");
            });
            //error here, what if the words are not the same length?
            const id = nextID(true);
            await db_words.put({ _id: id, words });
        } 
        else {
            // if not found
            throw new Error('Translation not found in history');
        }
    }
    catch (error) {
        throw new Error(`Error updating translation words: ${error}`);
    }
}

/**
 * Clears words database to reset matching game
 * 
 * @async
 * @throws Error - if there's a problem deleting database
 */
export async function clearWords() {
    try {
        const allDocs = await db_words.allDocs();
        const forRemoval = allDocs.rows.map(row => ({
            _id: row.id,
            _rev: row.value.rev,
            _deleted: true
        }));
        await db.bulkDocs(forRemoval);
    } catch (error) {
        throw new Error(`Error deleting words database: ${error}`);
    }
}
