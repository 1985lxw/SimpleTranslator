import * as db from "./db.js";
import express, { response } from "express";

import { readFile } from "fs/promises";
import * as http from "http";
import * as url from "url";
import path from "path";



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
        response.write(`<h1>Internal Server Error: ${err}</h1>`);
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
      response.write(JSON.stringify(hist));

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
 * Clear All History: Clears the database and resets history
 * 
 * CRUD: delete
 */
async function clearAllHistory(response) {
    try {
        await db.clearTranslationHistory();
        response.writeHead(200, headerFields);
        response.write(`<h1>All History Successfully Cleared</h1>`);
        response.end()
    }
    catch(err) {
        response.writeHead(404, headerFields);
        response.write(`<h1>Error deleting all history</h1>`);
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
async function updateTranslationHistory(response) {
  try {
      // Step 1: Retrieve Existing Translations
      const translations = await db.loadHistory(); // Assuming this function retrieves all translations

      // Step 2: Transform Translations
      const transformedTranslations = translations.map(translation => {
        //TODO
    });
    await db.updateTranslationHistory(transformedTranslations);
    response.writeHead(200, headerFields);
    response.write(`<h1>Translation History Successfully Updated</h1>`);
    response.end();
  } catch(err) {
    response.writeHead(500, headerFields);
    response.write(`<h1>Error updating translation history</h1>`);
    response.end();
  }
}

/**
 * Asynchronously stores the current translation into history. If the same translation exists, the id number is updated to indicate
 * that the translation was accessed again currently
 */

//NOT IMPLEMENTED

/**
 * Handles the requests to access the databases
 */
async function translatorServer(request, response) {
  // Parse the URL to get the pathname and the query parameters.
  const parsedUrl = url.parse(request.url, true);
  console.log("Parsed URL:", parsedUrl);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  console.log("Query parameters:", query);

  // HTTP method.
  const method = request.method;

  if (method === "POST" && pathname === "/store") {
    console.log("POST /store");
    const {input, output, lang_in, lang_out} = query;
    await storeTranslation(response, input, output, lang_in, lang_out);
  }
  else if (method === "GET" && pathname === "/read") {
    console.log("GET /read");
    const {n} = query;
    await readHistory(response, n);
  }
  else if (method === "DELETE" && pathname === "/clear") {
    console.log("DELETE /clear");
    await clearAllHistory(response);
  }
  else if (method === "PUT" && pathname === "/update") {
    console.log("PUT /update");
    //not implemented
    await updateTranslationHistory(response);
  }
  else {
    response.writeHead(401, headerFields);
    response.write("<h1>Invalid request</h1>");
    response.end();
  }
}


http.createServer(translatorServer).listen(5501, () => {
  console.log("Server started on port 5501");
});