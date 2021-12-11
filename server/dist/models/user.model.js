"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: "Can't create a user without a name",
    },
    email: {
        type: String,
        required: "cant create a user without a username",
        unique: "email is already registered",
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 40,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.user = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=user.model.js.map