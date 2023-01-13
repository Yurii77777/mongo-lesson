import { Request, Response } from "express";
import { UserModel } from "../model/user.model";

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        let data = {};

        const userId = req.params.id;

        data = await UserModel.deleteOne({ _id: userId });

        res.send(data);
    } catch (error) {
        res.status(500).json({
            message: "Запит не виконано, спробуйте повторити пізніше ...",
        });
    }
};
