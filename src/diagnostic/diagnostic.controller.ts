import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiagnosticService } from './diagnostic.service';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticService) {}

  @Post('create')
  create(
    @Body() createDiagnosticDto: CreateDiagnosticDto,
    @Param('token') token: string,
  ) {
    return this.diagnosticService.create(createDiagnosticDto, token);
  }

  @Get()
  getDiagnostics() {
    return this.diagnosticService.getDiagnostics();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiagnosticDto: UpdateDiagnosticDto,
  ) {
    return this.diagnosticService.update(+id, updateDiagnosticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticService.remove(+id);
  }
}
