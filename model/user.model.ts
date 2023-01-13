/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2021-2022> <Yurii Andriiko>
 * http://yurets.info/
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
import { model, Schema, Model, Document, Types } from "mongoose";
import { hashSync, compare } from "bcrypt";
import validator from "validator";

import { IArticle } from "./article.model";

export interface IUser extends Document {
    firstName: string;
    lastName?: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
    email: string;
    isActive: boolean;
    articles?: Array<IArticle>;
}

const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            unique: false,
            minLength: 2,
            maxLength: 50,
            set: (firstName: string) => firstName.toLowerCase(),
        },
        lastName: {
            type: String,
            required: false,
            unique: false,
            minLength: 2,
            maxLength: 50,
            set: (firstName: string) => firstName.toLowerCase(),
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            unique: false,
            set: (password: any) => hashSync(password, 10),
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: (email: string) => validator.isEmail(email),
            set: (firstName: string) => firstName.toLowerCase(),
        },
        isActive: {
            type: Boolean,
            required: true,
            unique: false,
            default: false,
        },
        articles: [{ type: Types.ObjectId, ref: "article" }],
    },
    { timestamps: true }
);

UserSchema.methods.comparePassword = async function (userPassword, next) {
    try {
        let user = <IUser>this;
        let isMatch = await compare(userPassword, user.password);

        return isMatch;
    } catch (error) {
        return next(error);
    }
};

export const UserModel: Model<IUser> = model<IUser>("mongo_user", UserSchema);
