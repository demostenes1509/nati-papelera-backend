import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  get(emailAddress: string): Promise<User | undefined> {
    this.logger.debug('Getting User');
    return this.userRepository.findOne({ where: { emailAddress } });
  }
}
