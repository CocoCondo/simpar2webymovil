import express from 'express';
import connectDB from './db-connect.ts';
import bodyParser from "body-parser";

import empresasApi from "./src/api/empresasApi.ts";
import personasApi from "./src/api/personasApi.ts";
import authMiddleWare, {authenticateToken} from "./src/api/auth.ts";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(authMiddleWare);

connectDB();

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}));

app.use("*", authenticateToken);
app.use("/api", empresasApi);
app.use("/api", personasApi);

var server = app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
});