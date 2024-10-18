/* eslint-disable @typescript-eslint/no-unused-vars */
import { ID } from 'src/shared/app/types/types.types';
import { NotFoundException } from '@nestjs/common';
import { Repository, DataSource, EntityTarget, QueryRunner, FindManyOptions } from 'typeorm';

// Interface
import { IGenericRepository } from 'src/shared/domain/irepositories/i-generic-repository.interface';
import { RepositoryOptions } from '../interface/options-generic.interface';

// Constants
import { ThrowError } from '@shared/app/utils/throw-error';
import { Errors } from '@shared/app/error/error.constants';

export abstract class GenericRepository<E> extends Repository<E> implements IGenericRepository<E> {
  constructor(
    public target: EntityTarget<E>,
    public dataSource: DataSource,
  ) {
    super(target, dataSource.createEntityManager());
  }

  abstract relations(): (object: E) => any;

  /** list Entities */
  public async listEntities(opt?: FindManyOptions<E>, query?: QueryRunner): Promise<E[]> {
    const { where } = { ...opt };

    const repository = this.getSimpleOrTransaction(query);

    return await repository.find({ where, relations: this.getRelations });
  }

  /** list Entities and Count */
  listEntitiesAndCount(query?: QueryRunner): Promise<[E[], number]> {
    throw new Error('Method not implemented.');
  }

  /** find One Entity by id */
  public async findOneEntity(id: ID, opt?: FindManyOptions<E>, query?: QueryRunner): Promise<E> {
    let { where } = { ...opt };
    const repository = this.getSimpleOrTransaction(query);

    where = { ...where, id } as any;

    return await repository.findOne({ where });
  }

  instanceEntity(e: E): E {
    return this.create(e);
  }

  /** save Entity */
  public async saveEntity(entity: E, options?: RepositoryOptions): Promise<E> {
    const { handleError = true, queryRunner } = { ...options };

    const repository = this.getSimpleOrTransaction(queryRunner);

    try {
      return await repository.save(entity);
    } catch (e) {
      if (!handleError) throw e;
      this.catchExceptions(e);
    }
  }

  /** update Entity */
  public async updateEntity(entity: E, options?: RepositoryOptions): Promise<E> {
    const { handleError = true, queryRunner } = { ...options };

    const repository = this.getSimpleOrTransaction(queryRunner);

    try {
      const res = await repository
        .createQueryBuilder()
        .update(this.create() as any)
        .set(entity as any)
        .where('id = :id', { id: entity['id'] })
        .execute();

      if (!res.affected) ThrowError.httpException(Errors.GenericRepository.UpdateEntity);
      return entity;
    } catch (e) {
      if (!handleError) throw e;
      this.catchExceptions(e);
    }
  }

  /** delete entity */
  public async deleteEntity(id: ID, options?: RepositoryOptions): Promise<E> {
    const { handleError = true, queryRunner } = { ...options };

    const repository = this.getSimpleOrTransaction(queryRunner);

    const entityF = await repository.findOne({ where: { id } as any });
    // if (!entityF) ThrowError.httpException(Errors.GenericRepository.DeleteEntity);

    try {
      return await repository.remove(entityF);
    } catch (error) {
      if (handleError === false) throw error;
      this.catchExceptions(error);
    }
  }

  /** soft delete entity */
  public async softDeleteEntity(id: ID, options?: RepositoryOptions): Promise<E> {
    const { handleError = true, queryRunner } = { ...options };

    const repository = this.getSimpleOrTransaction(queryRunner);

    const entityF = await repository.findOne({ where: { id } as any });
    // if (!entityF) ThrowError.httpException(Errors.GenericRepository.DeleteEntity);

    try {
      await repository.softDelete(id);
      return entityF;
    } catch (error) {
      if (handleError === false) throw error;
      this.catchExceptions(error);
    }
  }

  /** create and start transaction */
  public async createAndStartTransaction(): Promise<QueryRunner> {
    const transaction = this.dataSource.createQueryRunner();
    await transaction.connect();
    await transaction.startTransaction();

    return transaction;
  }

  /** commit transaction */
  public async commitTransaction(query: QueryRunner): Promise<void> {
    return await query.commitTransaction();
  }

  /** rollback transaction */
  public async rollbackTransaction(query: QueryRunner): Promise<void> {
    return await query.rollbackTransaction();
  }

  /** release transaction */
  public async releaseTransaction(query: QueryRunner): Promise<void> {
    return await query.release();
  }

  /** get queryRunner repository or a simple repository */
  protected getSimpleOrTransaction(query?: QueryRunner) {
    return query ? query.manager.getRepository(this.target) : this.dataSource.getRepository(this.target);
  }

  /** Catch Generic Exceptions */
  private catchExceptions(error): void {
    const code = error['code'];
    const detail = error['detail'] as string;
    const value = (detail?.split('=')[1] || '')?.match(/\(([^)]+)\)/);
    switch (code) {
      case '23503':
        throw new NotFoundException({
          message: `entity ${value[1]} not found`,
          friendlyMessage: `la entidad ${value[1]} no fue encontrada`,
        });
        break;

      case '23505':
        throw new NotFoundException({
          message: `key ${value[0]} alredy exists`,
          friendlyMessage: `campo ${value[0]} ya existe`,
        });
        break;

      case '23502':
        throw new NotFoundException({
          message: `not null values`,
          friendlyMessage: `no puede haber valores vacíos`,
        });
        break;

      default:
        throw error;
        break;
    }
  }

  private get getRelations() {
    return this.relations()
      .toString()
      .split('=>')[1]
      .trim()
      .replace('[', '')
      .replace(']', '')
      .split(',')
      .map((r) => r.slice(r.indexOf('.')).replace('.', ''));
  }
}
