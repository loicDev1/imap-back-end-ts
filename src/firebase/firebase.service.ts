import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseConfigModel } from 'src/Generics/Firebase.Config.model';

import {
  CollectionReference,
  Firestore,
  getFirestore,
  collection,
} from 'firebase/firestore';

@Injectable()
export class FirebaseService {
  private firebaseApp: FirebaseApp;
  public auth: Auth;
  public firestore: Firestore;
  public userCollection: CollectionReference;

  private _createCollection() {
    this.userCollection = collection(this.firestore, 'user');
  }

  constructor(public configService: ConfigService<FirebaseConfigModel>) {
    this.firebaseApp = initializeApp({
      apiKey: this.configService.get<string>('apiKey'),
      authDomain: this.configService.get<string>('authDomain'),
      projectId: this.configService.get<string>('projectId'),
      storageBucket: this.configService.get<string>('storageBucket'),
      messagingSenderId: this.configService.get<string>('messagingSenderId'),
      appId: this.configService.get<string>('appId'),
    });

    this.auth = getAuth(this.firebaseApp);
    this.firestore = getFirestore(this.firebaseApp);
    this._createCollection();
  }
}
