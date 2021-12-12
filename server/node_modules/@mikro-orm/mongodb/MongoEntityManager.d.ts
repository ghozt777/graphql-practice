import { AnyEntity, EntityManager, EntityName, EntityRepository, GetRepository } from '@mikro-orm/core';
import { MongoDriver } from './MongoDriver';
import { MongoEntityRepository } from './MongoEntityRepository';
import { Collection } from 'mongodb';
/**
 * @inheritDoc
 */
export declare class MongoEntityManager<D extends MongoDriver = MongoDriver> extends EntityManager<D> {
    /**
     * Shortcut to driver's aggregate method. Available in MongoDriver only.
     */
    aggregate(entityName: EntityName<any>, pipeline: any[]): Promise<any[]>;
    getCollection(entityName: EntityName<any>): Collection;
    getRepository<T extends AnyEntity<T>, U extends EntityRepository<T> = MongoEntityRepository<T>>(entityName: EntityName<T>): GetRepository<T, U>;
}
