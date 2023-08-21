import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Global()
@Module({
    imports: [],
    controllers:[],
    providers:[FirebaseService],
    exports:[FirebaseService]
})
export class FirebaseModule {}
