import PouchDB from "pouchdb";

const db = new PouchDB("translation-history");

/**
 * FUNCTIONS ACCESSING DATABASE:
 * - updates history
 * - clears history
 * - gets history
 */

