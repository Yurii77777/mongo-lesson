import { Request, Response } from "express";
import { UserModel } from "../model/user.model";

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        let data = {};

        const userData = req.body;

        data = await UserModel.create(userData);

        res.send(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};
