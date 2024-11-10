import express, { Express, Request, Response } from "express"; 
import dotenv from "dotenv";
dotenv.config();
import * as database from "./config/database";
database.connect();

import bodyParser from "body-parser";

const app: Express = express(); 
const port: number = 3000;

// parse application/json
app.use(bodyParser.json());

import { routesClient } from "./routes/client/index.route";


routesClient(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

