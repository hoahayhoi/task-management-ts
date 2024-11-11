import express, { Express, Request, Response } from "express"; 
import dotenv from "dotenv";
dotenv.config();
import * as database from "./config/database";
database.connect();

import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express(); 
const port: number = 3000;

// // Tất cả tên miền được phép truy cập vào
app.use(cors());
// Cho phép 1 tên miền cụ thể được phép truy cập
// const corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200
// }
// cors(corsOptions);

// parse application/json
app.use(bodyParser.json());

import { routesClient } from "./routes/client/index.route";


routesClient(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

