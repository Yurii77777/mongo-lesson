import { Request, Response } from "express";
import { ActicleModel } from "../model/article.model";
import { UserModel } from "../model/user.model";

export const createArticle = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        let data = {};

        const articleData = req.body;
        const { author } = articleData;

        const createdArticle = await ActicleModel.create(articleData);
        data = await UserModel.findOneAndUpdate(
            { _id: author },
            { $push: { articles: createdArticle } },
            { new: true }
        );

        res.send(data);
    } catch (error) {
        res.status(500).json({
            message: "Запит не виконано, спробуйте повторити пізніше ...",
        });
    }
};
