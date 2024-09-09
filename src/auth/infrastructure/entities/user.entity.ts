import { UUID } from 'src/shared/app/types/types.types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tblUsers' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'User_uuid' })
  id: UUID;

  @Column({ name: 'User_strName', unique: true })
  username: string;

  @Column({ name: 'User_strPassword' })
  password: string;
}
