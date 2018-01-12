import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface User {
  driver?: {
    companyLicense: string,
    dni: string,
    driverLicense: string,
    insurance: string,
    status: string,
    vehicleInfo: string
  },
  email: string,
  id: string,
  image: string,
  last_location: {
    _lat: number,
    _long: number
  },
  mobile: string,
  name: string,
  rating: number,
  role: string,
  status: string,
  verified: boolean
}

@Injectable()
export class FirebaseService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor() { }

}
