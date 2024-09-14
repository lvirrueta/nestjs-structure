// Dependencies
import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';

// Repositories
import { UserRepository } from 'src/auth/infrastructure/repositories/user.repository';

// Interface
import { IUser } from '../interface/i-user';
import { IUserRepository } from '../irepositories/user.repository.interface';

// Entity
import { UserEntity } from 'src/auth/infrastructure/entities/user.entity';

// DTO
import { SignUpDto } from 'src/auth/app/dto/sign-up.dto';
import { SignInDto } from 'src/auth/app/dto/sign-in.dto';

// Constants

@Injectable()
export class AuthService {
  constructor(@Inject(UserRepository) public readonly userRepository: IUserRepository) {}

  /** Login to the application */
  public async signIn(dto: SignInDto): Promise<IUser> {
    const { password: passwordLogin, username } = dto;
    const userBD = await this.userRepository.findByUsername(username);
    const { password: passwordBD } = { ...userBD };

    if (this.comparePassword(passwordLogin, passwordBD) && userBD) {
      return await userBD;
    }
  }

  /** Register to the application */
  public async signUp(dto: SignUpDto): Promise<IUser> {
    let { password, username } = dto;

    username = username.toLocaleLowerCase();
    password = await this.hashPassword(password);

    const user = new UserEntity({ username, password });
    return await this.userRepository.saveEntity(user);
  }

  /** Hash Password */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  /** Compare Password login with password hashed in the DB */
  private comparePassword(passwordLogin: string, passwordUser: string): boolean {
    return bcrypt.compareSync(passwordLogin || '', passwordUser || '');
  }
}
