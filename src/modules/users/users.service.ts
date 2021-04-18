import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async get(emailAddress: string, provider): Promise<User | undefined> {
    this.logger.debug('Getting User');
    return this.userRepository.findOne({ where: { emailAddress, provider } });
  }

  async getOrCreate(emailAddress: string, fullName: string, provider): Promise<User | undefined> {
    this.logger.debug('Getting or Creating User');
    let user = await this.get(emailAddress, provider);
    if (user) return user;
    else {
      user = await this.userRepository.save({ id: uuidv4(), emailAddress, fullName, provider, role: 'user' });
      return user;
    }
  }
}
