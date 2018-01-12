import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

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

@Injectable()
export class SharedGeodataService {

  private driverTracked   = new BehaviorSubject<User>({
    driver: {
      companyLicense: "",
      companyName: "",
      dni: "",
      driverLicense: "",
      insurance: "",
      status: "",
      vehicleInfo: ""
    },
    email: "",
    id: "",
    image: "",
    lastLocation: {
      _lat: -16.40805,
      _long: -71.516079
    },
    mobile: "",
    name: "",
    lastname: "",
    rating: 0,
    role: "",
    status: "",
    verified: false
  });
  currentDriverTracked    = this.driverTracked.asObservable();

  private isTracking   = new BehaviorSubject<boolean>(false);
  currentIsTracking    = this.isTracking.asObservable();

  private zoom   = new BehaviorSubject<number>(17);
  currentZoom    = this.zoom.asObservable();

  constructor() { 
    //console.log(this.driverTracked);
  }

  setDriverTracked(data: User){
    this.driverTracked.next(data);
  }

  setTrackingFlag(state: boolean){
    this.isTracking.next(state);
  }

  setZoom(zoom: number){
    this.zoom.next(zoom);
  }

}
