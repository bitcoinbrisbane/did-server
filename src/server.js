import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';
import DbManager from './dbManager';

import dotenv from 'dotenv';
dotenv.config();

// Set up the express app
const app = express();

let corsConfig = {
  origin: process.env.CORS_HOST
};

// Parse incoming requests data
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

DbManager.ensureDb(process.env.DB_DOC_NAME);
DbManager.ensureDb(process.env.DB_LOOKUP_NAME);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});