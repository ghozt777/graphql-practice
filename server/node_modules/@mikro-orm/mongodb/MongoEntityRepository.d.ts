import { EntityRepository, EntityName } from '@mikro-orm/core';
import { MongoEntityManager } from './MongoEntityManager';
export declare class MongoEntityRepository<T> extends EntityRepository<T> {
    protected readonly _em: MongoEntityManager;
    protected readonly entityName: EntityName<T>;
    constructor(_em: MongoEntityManager, entityName: EntityName<T>);
    /**
     * Shortcut to driver's aggregate method. Available in MongoDriver only.
     */
    aggregate(pipeline: any[]): Promise<any[]>;
    protected get em(): MongoEntityManager;
}
