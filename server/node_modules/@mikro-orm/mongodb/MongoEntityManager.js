"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoEntityManager = void 0;
const core_1 = require("@mikro-orm/core");
/**
 * @inheritDoc
 */
class MongoEntityManager extends core_1.EntityManager {
    /**
     * Shortcut to driver's aggregate method. Available in MongoDriver only.
     */
    async aggregate(entityName, pipeline) {
        entityName = core_1.Utils.className(entityName);
        return this.getDriver().aggregate(entityName, pipeline);
    }
    getCollection(entityName) {
        return this.getConnection().getCollection(entityName);
    }
    getRepository(entityName) {
        return super.getRepository(entityName);
    }
}
exports.MongoEntityManager = MongoEntityManager;
