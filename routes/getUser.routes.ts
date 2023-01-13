import { Request, Response } from "express";
import { UserModel } from "../model/user.model";

export const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
        let data = {};

        const userId = req.params.id;

        data = await UserModel.findOne({ _id: userId }).populate("articles");

        res.send(data);
    } catch (error) {
        console.log("[error]", error);
        res.status(500).json({
            message: "Запит не виконано, спробуйте повторити пізніше ...",
        });
    }
};
