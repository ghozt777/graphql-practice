"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = async () => {
    try {
        const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ghozt.1el8n.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
        await mongoose_1.default.connect(URL);
        console.log("connected to DB 🤙");
    }
    catch (e) {
        let message = "Unknown Error !";
        if (e instanceof Error)
            message = e.message;
        console.log("error while connecting to DB :  ", message);
    }
};
module.exports = connectToDB;
//# sourceMappingURL=db.connect.js.map