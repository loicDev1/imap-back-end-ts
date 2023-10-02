import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from './entities/Intervention.entity';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';
import { UpdateInterventionDto } from './dto/UpdateInterventionDto';

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
    } catch (error) {
      return error;
    }
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
      return error;
      console.log(error);
    }
  }

  async setStatusIntervention(UpdateIntervention: UpdateInterventionDto) {
    try {
      const r = await this.interventionRepository.save(UpdateIntervention);
      return this.interventionRepository.findOneBy({ id: r.id });
    } catch (error) {
      return error;
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
