/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2021-2022> <Yurii Andriiko>
 * http://yurets.info/
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
import express, { Express, Request, Response } from "express";

import { connect } from "./config/db.config";

import { createUser } from "./routes/createUser.routes";
import { getUsers } from "./routes/getUsers.routes";
import { getUser } from "./routes/getUser.routes";
import { updateUser } from "./routes/updateUser.routes";
import { deleteUser } from "./routes/deleteUser.routes";
import { regularLogin } from "./routes/regularLogin.routes";
import { createArticle } from "./routes/createArticle.routes";

const app: Express = express();
const PORT: number = Number(process.env["PORT"]) || 3080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
    "/api/user/create",
    async (req: Request, res: Response): Promise<any> => {
        createUser(req, res);
    }
);

app.post(
    "/api/article/create",
    async (req: Request, res: Response): Promise<any> => {
        createArticle(req, res);
    }
);

app.post(
    "/api/user/login",
    async (req: Request, res: Response): Promise<any> => {
        regularLogin(req, res);
    }
);

app.get("/api/users", async (req: Request, res: Response): Promise<any> => {
    getUsers(req, res);
});

app.get("/api/user/:id", async (req: Request, res: Response): Promise<any> => {
    getUser(req, res);
});

app.patch(
    "/api/user/update",
    async (req: Request, res: Response): Promise<any> => {
        updateUser(req, res);
    }
);

app.delete(
    "/api/user/:id",
    async (req: Request, res: Response): Promise<any> => {
        deleteUser(req, res);
    }
);

const start = async (): Promise<any> => {
    try {
        // Connect to MongoDB
        connect();

        // Start Epxress
        app.listen(PORT, () =>
            console.log(`App has been started on port ${PORT} `)
        );
    } catch (error) {
        console.log("The bot has not been launched :::", error.message);
    }
};

start();
