/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2021-2022> <Yurii Andriiko>
 * http://yurets.info/
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
import { model, Schema, Model, Document, Types } from "mongoose";

import { IUser } from "./user.model";

export interface IArticle extends Document {
    title: string;
    body: string;
    author: IUser;
}

const ArticleSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: false,
            minLength: 2,
            maxLength: 50,
        },
        body: {
            type: String,
            required: true,
            unique: false,
            minLength: 2,
            maxLength: 2000,
        },
        author: {
            type: Types.ObjectId,
            ref: "mongo_user",
            required: true,
        },
    },
    { timestamps: true }
);

export const ActicleModel: Model<IArticle> = model<IArticle>(
    "article",
    ArticleSchema
);
