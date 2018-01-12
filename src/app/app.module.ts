import { SharedGeodataService } from './services/shared-geodata.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatInputModule,
        MatExpansionModule} from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { GoogleMapDirective } from "./customDirectives/google-map.directive";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { HomeComponent } from './home/home.component';
import { HelloHomeComponent } from './hello-home/hello-home.component';
import { PedidosHomeComponent } from './pedidos-home/pedidos-home.component';
import { RastrearHomeComponent } from './rastrear-home/rastrear-home.component';
import { PasajerosHomeComponent } from './pasajeros-home/pasajeros-home.component';
import { ConductoresHomeComponent } from './conductores-home/conductores-home.component';
import { EmpresasHomeComponent } from './empresas-home/empresas-home.component';
import { PagosHomeComponent } from './pagos-home/pagos-home.component';
import { ReportesHomeComponent } from './reportes-home/reportes-home.component';
import { AnunciosHomeComponent } from './anuncios-home/anuncios-home.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MainToolbarComponent,
    HomeComponent,
    HelloHomeComponent,
    PedidosHomeComponent,
    RastrearHomeComponent,
    PasajerosHomeComponent,
    ConductoresHomeComponent,
    EmpresasHomeComponent,
    PagosHomeComponent,
    ReportesHomeComponent,
    AnunciosHomeComponent,
    GoogleMapDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABq3OZhYs98lZ-oeaD2uco2HgaeQ7C3qE'
    }),
    AgmSnazzyInfoWindowModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [SharedGeodataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
