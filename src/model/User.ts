import mongoose, { Schema, Document } from "mongoose";

// create an Interface : (interface is itself a data type)
export interface Message extends Document { // we use extends here because at the end all the data will be sent to the db in the form of Document.
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// User Interface
export interface User extends Document { // we use extends here because at the end all the data will be sent to the db in the form of Document.
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    varifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

// User Schema
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"]

    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "veify code is requierd"]
    },
    varifyCodeExpiry: {
        type: Date,
        required: [true, "verification expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]
});

// Here first () checking for the existing usermodel form db and second () model is for creating the new modle in db
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("user", UserSchema));

export default UserModel