import { DeepPartial, FindManyOptions, QueryRunner } from 'typeorm';
import { ID } from '../../app/types/types.types';
import { RepositoryOptions } from 'src/shared/infrastructure/interface/options-generic.interface';

/**
 * @param E Model Entity
 */
export interface IGenericRepository<E = any> {
  listEntities(opt?: FindManyOptions<E>, query?: QueryRunner): Promise<E[]>;
  listEntitiesAndCount(query?: QueryRunner): Promise<[E[], number]>;
  findOneEntity(id: ID, opt?: FindManyOptions<E>, query?: QueryRunner): Promise<E>;

  instanceEntity(entityLike: DeepPartial<any>): E;
  saveEntity(entity: E, options?: RepositoryOptions): Promise<E>;
  updateEntity(entity: E, options?: RepositoryOptions): Promise<E>;
  deleteEntity(id: ID, options?: RepositoryOptions): Promise<E>;
  softDeleteEntity(id: ID, options?: RepositoryOptions): Promise<E>;

  createAndStartTransaction(): Promise<QueryRunner>;
  commitTransaction(query: QueryRunner): Promise<void>;
  rollbackTransaction(query: QueryRunner): Promise<void>;
  releaseTransaction(query: QueryRunner): Promise<void>;
}
