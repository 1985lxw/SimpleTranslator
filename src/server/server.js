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
 * @param {*} response 
 * @param {*} name 
 */
async function storeTranslation(response, input, output) {
    if (input === undefined) {
      response.writeHead(400, headerFields);
      response.write("<h1>Translation input required</h1>");
      response.end();
    } 
    else {
      try {
        await db.saveTranslation(0, input, output);
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




const app = express();
const port = 3260;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));