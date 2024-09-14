import { ID } from '@shared/app/types/types.types';

export interface IJwtPayload {
  userID: ID;
  jti: ID;
}
