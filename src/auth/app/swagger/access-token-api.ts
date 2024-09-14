import { ApiProperty } from '@nestjs/swagger';
import { IAccessToken } from '@auth/domain/interface/i-access-token';

export class AccessTokenApi implements IAccessToken {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIyOTEwYzA1YS00YjI1LTRiMjAtYmRjNy00NTRhNjRjZGYyMDIiLCJqdGkiOiJjZDAyODMxOC00YzFiLTQ0YzMtYmUyMy02ODM4ZDg3ZTE4ZmMiLCJpYXQiOjE3MjYyODgyNDIsImV4cCI6MTcyOTg4ODI0Mn0.uOmLIv9zywEPiwVcFlbQfy1QcvwYpz6GI71AEmsn2kY',
  })
  refreshToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIyOTEwYzA1YS00YjI1LTRiMjAtYmRjNy00NTRhNjRjZGYyMDIiLCJqdGkiOiJjZDAyODMxOC00YzFiLTQ0YzMtYmUyMy02ODM4ZDg3ZTE4ZmMiLCJpYXQiOjE3MjYyODgyNDIsImV4cCI6MTcyOTg4ODI0Mn0.uOmLIv9zywEPiwVcFlbQfy1QcvwYpz6GI71AEmsn2kY',
  })
  accessToken: string;
}
