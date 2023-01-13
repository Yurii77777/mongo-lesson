import { Request, Response } from "express";
import { UserModel } from "../model/user.model";

export const regularLogin = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        let data = {};

        const userData: { email: string; password: string } = req.body;
        const { email, password } = userData;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Такого піздюка в нашій базі не має 🙅‍♂️",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Мімо, не попав в пароль 🤷",
            });
        }

        data["userData"] = user;
        data["token"] = "МА-РА-ДЄЦ!";

        res.send(data);
    } catch (error) {
        res.status(500).json({
            message: "Запит не виконано, спробуйте повторити пізніше ...",
        });
    }
};
