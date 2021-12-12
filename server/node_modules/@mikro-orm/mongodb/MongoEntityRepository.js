"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoEntityRepository = void 0;
const core_1 = require("@mikro-orm/core");
class MongoEntityRepository extends core_1.EntityRepository {
    constructor(_em, entityName) {
        super(_em, entityName);
        this._em = _em;
        this.entityName = entityName;
    }
    /**
     * Shortcut to driver's aggregate method. Available in MongoDriver only.
     */
    async aggregate(pipeline) {
        return this.em.aggregate(this.entityName, pipeline);
    }
    get em() {
        return this._em.getContext();
    }
}
exports.MongoEntityRepository = MongoEntityRepository;
