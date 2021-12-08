"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cat = void 0;
const mongoose_1 = require("mongoose");
const catSchema = new mongoose_1.Schema({
    name: { type: String, required: "Can't create a cat without a name " },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
exports.cat = (0, mongoose_1.model)("cat", catSchema);
//# sourceMappingURL=cat.model.js.map