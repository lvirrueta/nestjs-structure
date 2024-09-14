import { QueryRunner } from 'typeorm';

export interface RepositoryOptions {
  /** Query Runner for transactions */
  queryRunner?: QueryRunner;

  /** flag to indicate if you want that generic repository handle errors */
  handleError?: boolean;
}
