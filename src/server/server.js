import * as db from "./db.js";
import express, { response } from "express";
import logger from "morgan";


/**
 * Connects CRUD operations to the database for storage and retrieval
 */
const headerFields = { "Content-Type": "text/html" };

/**
 * Asynchronously creates a history of the translation in the database, If the input field is empty, a 400 status code
 * is returned to indicate database update failure. Otherwise, it stores the full translation history
 * 
 * TODO: add a check for past translation, if exists update id number to match the order
 * 
 * CRUD: create
 * 
 * @async
 * @param {*} response 
 * @param {*} input
 * @param {*} output
 */
async function storeTranslation(response, input, output, lang_in, lang_out) {
    if (input === undefined) {
      response.writeHead(400, headerFields);
      response.write("<h1>Translation input required</h1>");
      response.end();
    } 
    else {
      try {
        await db.saveTranslation(input, output, lang_in, lang_out);
        response.writeHead(200, headerFields);
        response.write(`<h1>Translation of ${input} successfully stored</h1>`);
        response.end();
      } 
      catch (err) {
        response.writeHead(500, headerFields);
        response.write("<h1>Internal Server Error</h1>");
        response.write("<p>Unable to store translation</p>");
        response.end();
      }
    }
}

/**
 * Asynchronously reads the history of the past n translations. If n are unavailable, only available history is returns
 * and the user is notified.
 * 
 * CRUD: read
 * 
 * @async
 * @param {*} response 
 * @param {*} n - the number of documents we want to access
 */
async function readHistory(response, n) {
    try {
      const hist = await db.loadHistory(n);
      response.writeHead(200, headerFields);
      response.write(`<h1>History successfully read</h1>`);

      if (hist.length < n) {
        response.write(`<p>Only ${hist.length} documents are available however`)
      }
      response.end();
    } 
    catch (err) {
      response.writeHead(404, headerFields);
      response.write(`<h1>History unavailable</h1>`);
      response.end();
    }
}

/**
 * Asynchronously updates the history of phrases into single words for matching tile game
 * 
 * CRUD: update
 * 
 * 
 */
//TODO


/**
 * Asynchronously stores the current translation into history. If the same translation exists, the id number is updated to indicate
 * that the translation was accessed again currently
 */

const app = express();
const port = 3260;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));