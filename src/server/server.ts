import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const server: Express = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

export default server;
