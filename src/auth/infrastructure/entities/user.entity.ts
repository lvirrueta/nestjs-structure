import { IUser } from 'src/auth/domain/interface/i-user';
import { ID } from 'src/shared/app/types/types.types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblUsers' })
export class UserEntity implements IUser {
  constructor(dto?: IUser) {
    const { password, username } = { ...dto };
    this.password = password;
    this.username = username;
  }

  @PrimaryGeneratedColumn('uuid', { name: 'User_uuid' })
  id: ID;

  @Column({ name: 'User_strName', unique: true })
  username: string;

  @Column({ name: 'User_strPassword' })
  password: string;
}
