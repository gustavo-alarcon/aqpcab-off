import {HttpClient, HttpHeaders} from '@angular/common/http';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GoogleMapsAPIWrapper } from "../../../node_modules/@agm/core/services/google-maps-api-wrapper";


declare var google: any;

interface queuedService {
  date: Date,
  destination: {
    _lat: number,
    _long: number
  },
  estimatedTime: number,
  origin: {
    _lat: number,
    _long:number
  },
  rider: string,
  status: string
}

@Component({
  selector: 'app-pedidos-home',
  templateUrl: './pedidos-home.component.html',
  styleUrls: ['./pedidos-home.component.scss'],
  providers: [GoogleMapsAPIWrapper]
})
export class PedidosHomeComponent implements OnInit {

  geocoder = new google.maps.Geocoder();

  queuedServicesCollection: AngularFirestoreCollection<queuedService>;
  queuedServices: Observable<queuedService[]>;
  queuedServicesGeocode: any[] = [];
  

  constructor(private db: AngularFirestore,
              private gmapsApi: GoogleMapsAPIWrapper,
              private http: HttpClient) { 

    this.queuedServicesCollection = this.db.collection('queued-services');
    this.queuedServices = this.queuedServicesCollection.valueChanges();
    
    this.queuedServices.subscribe(res => {
      
        for(let i = 0; i < res.length; i++){

          this.queuedServicesGeocode.push({
            date: res[i].date,
            destination: "",
            estimatedTime: res[i].estimatedTime,
            origin: "",
            rider: res[i].rider,
            status: res[i].status
          });

          let url_origin = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+res[i].origin._lat+","+res[i].origin._long+"&key=AIzaSyABq3OZhYs98lZ-oeaD2uco2HgaeQ7C3qE";
          let url_destination = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+res[i].destination._lat+","+res[i].destination._long+"&key=AIzaSyABq3OZhYs98lZ-oeaD2uco2HgaeQ7C3qE";

          this.http.get(url_origin).subscribe(res => {

            this.queuedServicesGeocode[i]['origin'] = res['results'][0]['formatted_address'].split(",")[0] + " / " + res['results'][1]['formatted_address'].split(",")[0];
            
          });

          this.http.get(url_destination).subscribe(res => {

            this.queuedServicesGeocode[i]['destination'] = res['results'][0]['formatted_address'].split(",")[0] + " / " + res['results'][1]['formatted_address'].split(",")[0];
            
          });
        }
      
        console.log(this.queuedServicesGeocode);
    });

    
  }

  ngOnInit() {
    
  }
  
  cordsToAddress(lat: number, lng: number): any{

    let url;
    let geocodeReversed;

    url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyABq3OZhYs98lZ-oeaD2uco2HgaeQ7C3qE";

    this.http.get(url).subscribe(res => {
      geocodeReversed =  res['results'][0]['formatted_address'].split(",")[0] + " / " + res['results'][1]['formatted_address'].split(",")[0];
      return geocodeReversed;
    });

  }
}
