import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instance } from 'src/entities/internal/instance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserInstancesService {
  constructor(
    @InjectRepository(Instance)
    private userinstancesRepository: Repository<Instance>,
  ) {}

  findAllByUser(userId: string): Promise<Array<Instance>> {
    return this.userinstancesRepository.find({ where: { userId } });
  }
}
