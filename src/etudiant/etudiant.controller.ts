import { Controller, Get } from '@nestjs/common';

@Controller('api/etudiant')
export class EtudiantController {
    @Get()
    bib(){
        return {'ello':'devo'}
    }
}
