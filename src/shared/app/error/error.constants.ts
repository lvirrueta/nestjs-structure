import { HttpStatus } from '@nestjs/common';

export const Errors = {
  Auth: {
    /** description: Invalid credentials */
    IncorrectCredentials: {
      message: 'Invalid credentials',
      statusCode: HttpStatus.FORBIDDEN,
      errorCode: 'AUIC-01',
    },

    /** description: This user is already registered */
    UserRegistered: {
      message: 'User already registered',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'AUUR-02',
    },
  },

  GenericRepository: {
    /** description: The entity to update not exists */
    UpdateEntity: {
      message: 'The entity to update not exists',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'GEUE-01',
    },

    /** description: The entity to delete not exists */
    DeleteEntity: {
      message: 'The entity to delete not exists',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'GEDE-02',
    },
  },
};
