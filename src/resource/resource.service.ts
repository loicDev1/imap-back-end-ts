import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly ResourceRepository: Repository<Resource>,
  ) {}

  async create(createResourceDto: CreateResourceDto[]) {
    return this.ResourceRepository.insert(createResourceDto);
  }

  findAll() {
    return this.ResourceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
