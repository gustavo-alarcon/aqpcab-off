import { SharedGeodataService } from './../services/shared-geodata.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface User {
  driver?: {
    companyLicense: string,
    companyName: string,
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
  lastname: string,
  rating: number,
  role: string,
  status: string,
  verified: boolean
}

@Component({
  selector: 'app-rastrear-home',
  templateUrl: './rastrear-home.component.html',
  styleUrls: ['./rastrear-home.component.scss']
})
export class RastrearHomeComponent implements OnInit {

  @Output() currentTrackedLocation: EventEmitter<{}> = new EventEmitter();

  driversCollection: AngularFirestoreCollection<User>;
  ridersCollection: AngularFirestoreCollection<User>;
  drivers: Observable<User[]>;
  riders: Observable<User[]>;

  constructor(private db: AngularFirestore,
              private sharedGeodataservice: SharedGeodataService) {

    this.driversCollection = this.db.collection('User', ref => {
      return ref.where('role', '==', 'Driver');
    });
    this.drivers = this.driversCollection.valueChanges();

    this.ridersCollection = this.db.collection('User', ref => {
      return ref.where('role', '==', 'Rider');
    });
    this.riders = this.ridersCollection.valueChanges();

  }

  ngOnInit() {
  }

  setFocusOnMap(driver){
    this.sharedGeodataservice.setDriverTracked(driver);
    this.sharedGeodataservice.setTrackingFlag(true);
    //this.sharedGeodataservice.setZoom(20);
  }

}
