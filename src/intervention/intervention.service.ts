import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from './entities/Intervention.entity';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';

@Injectable()
export class InterventionService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepository: Repository<Intervention>,
  ) {}

  async CreateIntervention(
    intervention: Partial<Intervention>,
    userToken: string,
  ): Promise<any> {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      const { id: user, service } = result.data;
      return await this.interventionRepository.save({
        ...intervention,
        user,
        service,
      });
    } catch (error) {}
  }

  async getInterventionById(id: number): Promise<Intervention | null> {
    try {
      return await this.interventionRepository.findOneBy({ id });
    } catch (error) {}
  }

  async getInterventionByUser(
    userToken: string,
  ): Promise<Intervention | Intervention[]> {
    try {
      const result = await decodeJwtTokenToUser(userToken);
      const { id: user } = await result.data;
      return await this.interventionRepository.findOneBy({ user });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllIntervention(): Promise<Intervention[]> {
    try {
      return await this.interventionRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIntervention(id: number) {
    try {
      return await this.interventionRepository.softDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
