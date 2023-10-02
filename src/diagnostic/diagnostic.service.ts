import { Injectable } from '@nestjs/common';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnostic } from './entities/diagnostic.entity';
import { ResourceService } from '../resource/resource.service';
import { Repository } from 'typeorm';
import { decodeJwtTokenToUser } from 'src/helpers/helpers.utils';

@Injectable()
export class DiagnosticService {
  constructor(
    @InjectRepository(Diagnostic)
    private readonly diagnosticRepository: Repository<Diagnostic>,
    private readonly ResourceService: ResourceService,
  ) {}

  async create(createDiagnosticDto: CreateDiagnosticDto, userToken: string) {
    try {
      const { data: user } = await decodeJwtTokenToUser(userToken);
      const {
        problematique,
        perspective,
        analyse,
        materiel,
        imateriel,
        humain,
      } = createDiagnosticDto;
      const diag = await this.diagnosticRepository.save({
        problematique,
        perspective,
        analyse,
        user,
      });

      const allResources = [...materiel, ...imateriel, ...humain].map((e) => {
        e.diagnostic = diag.id;
        return e;
      });
      if (allResources.length > 0) {
        await this.ResourceService.create(allResources);
      }
      return await this.diagnosticRepository.findOneBy({ id: diag.id });
    } catch (error) {
      return error;
    }
  }

  getDiagnostics() {
    try {
      return this.diagnosticRepository.find();
    } catch (error) {
      return error;
    }
  }

  update(id: number, updateDiagnosticDto: UpdateDiagnosticDto) {
    return `This action updates a #${id} diagnostic`;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnostic`;
  }
}
