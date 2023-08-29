import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { InterventionService } from './intervention.service';
import { CreateInterventionDTO } from './dto/CreateInterventionDTO';

@Controller('intervention')
export class InterventionController {
  constructor(private readonly interService: InterventionService) {}

  @Post('/create')
  async CreateIntervention(
    @Body() intervention: CreateInterventionDTO,
    @Query('token') userToken: string,
  ) {
    return this.interService.CreateIntervention(intervention, userToken);
  }

  @Get(':id')
  async getInterventionById(@Param('id', ParseIntPipe) id: number) {
    return this.interService.getInterventionById(id);
  }

  @Get('getByConnectUser')
  async getInterventionByConnectUser(@Query('token') userToken: string) {
    return this.interService.getInterventionByUser(userToken);
  }

  @Get()
  async getAllIntervention() {
    return this.interService.getAllIntervention();
  }

  @Delete('delete/:id')
  async deleteIntervention(@Param('id') id: number) {
    return this.interService.deleteIntervention(id);
  }
}
