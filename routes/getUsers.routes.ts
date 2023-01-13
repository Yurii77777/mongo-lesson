import { Request, Response } from "express";
import { UserModel } from "../model/user.model";

export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        let data = [];

        data = await UserModel.find({});

        res.send(data);
    } catch (error) {
        res.status(500).json({
            message: "Запит не виконано, спробуйте повторити пізніше ...",
        });
    }
};
