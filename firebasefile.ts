// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCA3ZSOQuFRbdzW6t_MlCZQaKSQ5HRpZjg",
//   authDomain: "imap-88a3f.firebaseapp.com",
//   projectId: "imap-88a3f",
//   storageBucket: "imap-88a3f.appspot.com",
//   messagingSenderId: "396918082261",
//   appId: "1:396918082261:web:0e11f4b49a0083ea5b305c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { FirebaseService } from 'src/firebase/firebase.service';
// import { User } from 'src/models/user.model';
// import {
//     UserCredential,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     sendEmailVerification,
// } from 'firebase/auth'
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { getAuth } from 'firebase-admin/auth';
// var admin = require("firebase-admin");
// var serviceAccount = require("../../firebaseCredentials.json");

// let app = null

// @Injectable()
// export class AuthService {

//     constructor(
//         private readonly firebaseService: FirebaseService,
//         @InjectModel('user') private readonly userModel: Model<User>
//     ) { }

//     async login(user: Pick<User, 'email' | 'password'>) {
//         try {
//             const userCredential = await signInWithEmailAndPassword(
//                 this.firebaseService.auth,
//                 user.email,
//                 user.password
//             )
//             const userFound = await this.userModel.findOne({ email: user.email })
//             return { userData: userFound, ...userCredential };

//         } catch (error) {
//             throw new HttpException({
//                 status: HttpStatus.BAD_REQUEST,
//                 error: error.message,
//             }, HttpStatus.FORBIDDEN, {
//                 cause: error
//             });
//         }
//     }

//     async register(user: Omit<User, 'id'>): Promise<any> {
//         try {
//             const userCredential: UserCredential = await createUserWithEmailAndPassword(
//                 this.firebaseService.auth,
//                 user.email,
//                 user.password,
//             )
//             await sendEmailVerification(userCredential.user)
//             delete user.password
//             const newUser = new this.userModel({ ...user })
//             await newUser.save()
//             return { message: 'user successfully registered', statusCode: 201 }
//         } catch (error) {
//             throw new HttpException({
//                 status: HttpStatus.FORBIDDEN,
//                 error: error.message,
//             }, HttpStatus.FORBIDDEN, {
//                 cause: error
//             });
//         }
//     }

//     async isAuthenticateUser(user: any) {
//         try {
//             if (!app) {
//                 app = admin.initializeApp({
//                     credential: admin.credential.cert(serviceAccount)
//                 });
//             }
//             await getAuth().verifyIdToken(user.idToken)
//         } catch (error) {
//             throw new HttpException({
//                 status: HttpStatus.FORBIDDEN,
//                 error: error.message,
//             }, HttpStatus.FORBIDDEN, {
//                 cause: error
//             });
//         }
//     }
// }