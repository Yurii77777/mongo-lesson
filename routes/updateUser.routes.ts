import { Request, Response } from "express";
import { UserModel } from "../model/user.model";

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        let data = [];

        const userData = req.body;
        const { userId, update } = userData;

        data = await UserModel.findByIdAndUpdate({ _id: userId }, update, {
            new: true,
        });

        res.send(data);
    } catch (error) {
        res.status(500).json({
            message: "Запит не виконано, спробуйте повторити пізніше ...",
        });
    }
};
