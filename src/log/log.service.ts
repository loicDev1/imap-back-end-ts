import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { ReqPerso } from 'src/helpers/helpers.useRequest';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly LogRepository: Repository<Log>,
  ) {}

  async createLog(data: ReqPerso) {
    try {
      const { typeOperation, description, user } = data;
      return await this.LogRepository.save({
        typeOperation,
        description,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
