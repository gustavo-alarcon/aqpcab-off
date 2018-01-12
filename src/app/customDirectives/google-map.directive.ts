import { Directive, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from "../../../node_modules/@agm/core/services/google-maps-api-wrapper";
declare var google: any;

@Directive({
  selector: 'agm-directions'
})
export class GoogleMapDirective {

  @Input() origin;
  @Input() destination;
  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  ngOnInit(){
    this.gmapsApi.getNativeMap().then(map => {
              var directionsService = new google.maps.DirectionsService;
              var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
              directionsDisplay.setMap(map);
              directionsService.route({
                      origin: {lat: this.origin.latitude, lng: this.origin.longitude},
                      destination: {lat: this.destination.latitude, lng: this.destination.longitude},
                      waypoints: [],
                      optimizeWaypoints: true,
                      travelMode: 'DRIVING'
                    }, function(response, status) {
                                if (status === 'OK') {
                                  console.log(response.routes[0].legs[0].duration.text);
                                  directionsDisplay.setDirections(response);
                                } else {
                                  window.alert('Directions request failed due to ' + status);
                                }
              });

    });
  }

}
