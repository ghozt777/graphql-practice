"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        reqiured: "Can't create a post without a title",
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.post = (0, mongoose_1.model)("post", postSchema);
//# sourceMappingURL=post.model.js.map