import { SharedGeodataService } from './../services/shared-geodata.service';
import { Component, OnInit } from '@angular/core';
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
  lastLocation: {
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  style: any = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ];
  zoom : number = 17;

  isTracking: boolean;

  centerLatLng: {};
  driverTracked: User;
  destination = {longitude:-71.522936, latitude:-16.410017};

  driversCollection: AngularFirestoreCollection<User>;
  ridersCollection: AngularFirestoreCollection<User>;
  drivers: any = [];
  riders: Observable<User[]>;

  constructor(private db: AngularFirestore,
              private sharedGeodataService: SharedGeodataService) {

    this.driversCollection = this.db.collection('User', ref => {
      return ref.where('role', '==', 'Driver');
    });
    this.driversCollection.valueChanges().subscribe(res=>{
      this.drivers = res;
      if(this.isTracking ){
        this.drivers.forEach(element => {
          if(element.name === this.driverTracked.name && element.lastname === this.driverTracked.lastname){
            this.centerLatLng = {
              latitude:element['last_location']['_lat'],
              longitude:element['last_location']['_long']
            };
          }
        });
      }
    });

    this.ridersCollection = this.db.collection('User', ref => {
      return ref.where('role', '==', 'Rider');
    });
    this.riders = this.ridersCollection.valueChanges();
    
  }

  ngOnInit() {

    this.sharedGeodataService.currentDriverTracked.subscribe(res => {
      this.driverTracked = res;
      this.centerLatLng = {
        latitude:this.driverTracked.lastLocation._lat,
        longitude:this.driverTracked.lastLocation._long
      };
    });

    this.sharedGeodataService.currentIsTracking.subscribe(res => {
      this.isTracking = res;
    });

    this.sharedGeodataService.currentZoom.subscribe(res => {
      this.zoom = res;
    });
  }

  changeDriver(lat, lng){
    this.destination = {longitude:lng, latitude:lat};
    console.log(this.destination);
  }

}
