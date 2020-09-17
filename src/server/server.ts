import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { adminRouter } from "../routes";
import { userRouter } from "../routes";

const server: Express = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

server.use("/library/v1", adminRouter, userRouter);

export default server;
