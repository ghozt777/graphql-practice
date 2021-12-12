"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDriver = void 0;
const mongodb_1 = require("mongodb");
const core_1 = require("@mikro-orm/core");
const MongoConnection_1 = require("./MongoConnection");
const MongoPlatform_1 = require("./MongoPlatform");
const MongoEntityManager_1 = require("./MongoEntityManager");
class MongoDriver extends core_1.DatabaseDriver {
    constructor(config) {
        super(config, ['mongodb']);
        this.connection = new MongoConnection_1.MongoConnection(this.config);
        this.platform = new MongoPlatform_1.MongoPlatform();
    }
    createEntityManager(useContext) {
        return new MongoEntityManager_1.MongoEntityManager(this.config, this, this.metadata, useContext);
    }
    async find(entityName, where, options = {}, ctx) {
        const fields = this.buildFields(entityName, options.populate || [], options.fields);
        where = this.renameFields(entityName, where, true);
        const res = await this.rethrow(this.getConnection('read').find(entityName, where, options.orderBy, options.limit, options.offset, fields, ctx));
        return res.map(r => this.mapResult(r, this.metadata.find(entityName)));
    }
    async findOne(entityName, where, options = { populate: [], orderBy: {} }, ctx) {
        if (core_1.Utils.isPrimaryKey(where)) {
            where = this.buildFilterById(entityName, where);
        }
        const fields = this.buildFields(entityName, options.populate || [], options.fields);
        where = this.renameFields(entityName, where, true);
        const res = await this.rethrow(this.getConnection('read').find(entityName, where, options.orderBy, 1, undefined, fields, ctx));
        return this.mapResult(res[0], this.metadata.find(entityName));
    }
    async count(entityName, where, options = {}, ctx) {
        where = this.renameFields(entityName, where, true);
        return this.rethrow(this.getConnection('read').countDocuments(entityName, where, ctx));
    }
    async nativeInsert(entityName, data, ctx) {
        data = this.renameFields(entityName, data);
        return this.rethrow(this.getConnection('write').insertOne(entityName, data, ctx));
    }
    async nativeInsertMany(entityName, data, ctx, processCollections = true) {
        data = data.map(d => this.renameFields(entityName, d));
        return this.rethrow(this.getConnection('write').insertMany(entityName, data, ctx));
    }
    async nativeUpdate(entityName, where, data, ctx) {
        if (core_1.Utils.isPrimaryKey(where)) {
            where = this.buildFilterById(entityName, where);
        }
        where = this.renameFields(entityName, where, true);
        data = this.renameFields(entityName, data);
        return this.rethrow(this.getConnection('write').updateMany(entityName, where, data, ctx));
    }
    async nativeUpdateMany(entityName, where, data, ctx, processCollections) {
        data = data.map(row => this.renameFields(entityName, row));
        return this.rethrow(this.getConnection('write').bulkUpdateMany(entityName, where, data, ctx));
    }
    async nativeDelete(entityName, where, ctx) {
        if (core_1.Utils.isPrimaryKey(where)) {
            where = this.buildFilterById(entityName, where);
        }
        where = this.renameFields(entityName, where, true);
        return this.rethrow(this.getConnection('write').deleteMany(entityName, where, ctx));
    }
    async aggregate(entityName, pipeline, ctx) {
        return this.rethrow(this.getConnection('read').aggregate(entityName, pipeline, ctx));
    }
    async createCollections() {
        const existing = await this.getConnection('write').listCollections();
        const metadata = Object.values(this.metadata.getAll()).filter(meta => {
            const isRootEntity = meta.root.className === meta.className;
            return isRootEntity && !meta.embeddable;
        });
        const promises = metadata
            .filter(meta => !existing.includes(meta.collection))
            .map(meta => this.getConnection('write').createCollection(meta.collection));
        await this.rethrow(Promise.all(promises));
    }
    async dropCollections() {
        const db = this.getConnection('write').getDb();
        const collections = await this.rethrow(db.listCollections().toArray());
        const existing = collections.map(c => c.name);
        const promises = Object.values(this.metadata.getAll())
            .filter(meta => existing.includes(meta.collection))
            .map(meta => this.getConnection('write').dropCollection(meta.collection));
        await this.rethrow(Promise.all(promises));
    }
    async ensureIndexes() {
        await this.rethrow(this.createCollections());
        const promises = [];
        for (const meta of Object.values(this.metadata.getAll())) {
            promises.push(...this.createIndexes(meta));
            promises.push(...this.createUniqueIndexes(meta));
            for (const prop of meta.props) {
                promises.push(...this.createPropertyIndexes(meta, prop, 'index'));
                promises.push(...this.createPropertyIndexes(meta, prop, 'unique'));
            }
        }
        await this.rethrow(Promise.all(promises));
    }
    createIndexes(meta) {
        const promises = [];
        meta.indexes.forEach(index => {
            let fieldOrSpec;
            const properties = core_1.Utils.flatten(core_1.Utils.asArray(index.properties).map(prop => meta.properties[prop].fieldNames));
            const collection = this.getConnection('write').getCollection(meta.name);
            if (index.options && properties.length === 0) {
                return promises.push(collection.createIndex(index.options));
            }
            if (index.type) {
                const spec = {};
                properties.forEach(prop => spec[prop] = index.type);
                fieldOrSpec = spec;
            }
            else {
                fieldOrSpec = properties.reduce((o, i) => { o[i] = 1; return o; }, {});
            }
            promises.push(collection.createIndex(fieldOrSpec, Object.assign({ name: index.name, unique: false }, (index.options || {}))));
        });
        return promises;
    }
    createUniqueIndexes(meta) {
        const promises = [];
        meta.uniques.forEach(index => {
            const properties = core_1.Utils.flatten(core_1.Utils.asArray(index.properties).map(prop => meta.properties[prop].fieldNames));
            const fieldOrSpec = properties.reduce((o, i) => { o[i] = 1; return o; }, {});
            promises.push(this.getConnection('write').getCollection(meta.name).createIndex(fieldOrSpec, Object.assign({ name: index.name, unique: true }, (index.options || {}))));
        });
        return promises;
    }
    createPropertyIndexes(meta, prop, type) {
        if (!prop[type]) {
            return [];
        }
        const fieldOrSpec = prop.fieldNames.reduce((o, i) => { o[i] = 1; return o; }, {});
        return [this.getConnection('write').getCollection(meta.name).createIndex(fieldOrSpec, {
                name: (core_1.Utils.isString(prop[type]) ? prop[type] : undefined),
                unique: type === 'unique',
                sparse: prop.nullable === true,
            })];
    }
    renameFields(entityName, data, where = false) {
        data = Object.assign({}, data); // copy first
        core_1.Utils.renameKey(data, 'id', '_id');
        const meta = this.metadata.find(entityName);
        if (meta) {
            this.inlineEmbeddables(meta, data, where);
        }
        Object.keys(data).forEach(k => {
            if (core_1.Utils.isGroupOperator(k)) {
                /* istanbul ignore else */
                if (Array.isArray(data[k])) {
                    data[k] = data[k].map((v) => this.renameFields(entityName, v));
                }
                else {
                    data[k] = this.renameFields(entityName, data[k]);
                }
                return;
            }
            if (meta === null || meta === void 0 ? void 0 : meta.properties[k]) {
                const prop = meta.properties[k];
                let isObjectId = false;
                if (prop.reference === core_1.ReferenceType.SCALAR) {
                    isObjectId = prop.type.toLowerCase() === 'objectid';
                }
                else if (prop.reference !== core_1.ReferenceType.EMBEDDED) {
                    const meta2 = this.metadata.find(prop.type);
                    const pk = meta2.properties[meta2.primaryKeys[0]];
                    isObjectId = pk.type.toLowerCase() === 'objectid';
                }
                if (isObjectId) {
                    data[k] = this.convertObjectIds(data[k]);
                }
                if (prop.fieldNames) {
                    core_1.Utils.renameKey(data, k, prop.fieldNames[0]);
                }
            }
            if (core_1.Utils.isPlainObject(data[k]) && '$re' in data[k]) {
                data[k] = new RegExp(data[k].$re);
            }
        });
        return data;
    }
    convertObjectIds(data) {
        if (data instanceof mongodb_1.ObjectId) {
            return data;
        }
        if (core_1.Utils.isString(data) && data.match(/^[0-9a-f]{24}$/i)) {
            return new mongodb_1.ObjectId(data);
        }
        if (Array.isArray(data)) {
            return data.map((item) => this.convertObjectIds(item));
        }
        if (core_1.Utils.isObject(data)) {
            Object.keys(data).forEach(k => {
                data[k] = this.convertObjectIds(data[k]);
            });
        }
        return data;
    }
    buildFilterById(entityName, id) {
        const meta = this.metadata.find(entityName);
        if (meta.properties[meta.primaryKeys[0]].type.toLowerCase() === 'objectid') {
            return { _id: new mongodb_1.ObjectId(id) };
        }
        return { _id: id };
    }
    buildFields(entityName, populate, fields) {
        const meta = this.metadata.find(entityName);
        const lazyProps = meta.props.filter(prop => prop.lazy && !populate.some(p => p.field === prop.name || p.all));
        const ret = [];
        if (fields) {
            for (const field of fields) {
                if (core_1.Utils.isPlainObject(field) || field.toString().includes('.')) {
                    continue;
                }
                let prop = meta.properties[field];
                /* istanbul ignore else */
                if (prop) {
                    prop = prop.serializedPrimaryKey ? meta.getPrimaryProps()[0] : prop;
                    ret.push(prop.fieldNames[0]);
                }
                else {
                    ret.push(field);
                }
            }
            ret.unshift(...meta.primaryKeys.filter(pk => !fields.includes(pk)));
        }
        else if (lazyProps.filter(p => !p.formula).length > 0) {
            const props = meta.props.filter(prop => this.shouldHaveColumn(prop, populate));
            ret.push(...core_1.Utils.flatten(props.filter(p => !lazyProps.includes(p)).map(p => p.fieldNames)));
        }
        return ret.length > 0 ? ret : undefined;
    }
    shouldHaveColumn(prop, populate) {
        if (super.shouldHaveColumn(prop, populate)) {
            return true;
        }
        return prop.reference === core_1.ReferenceType.MANY_TO_MANY && prop.owner;
    }
}
exports.MongoDriver = MongoDriver;
