"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = (ms) => new Promise((res, _) => setTimeout(res, ms));
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map