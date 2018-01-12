import { AnunciosHomeComponent } from './anuncios-home/anuncios-home.component';
import { PagosHomeComponent } from './pagos-home/pagos-home.component';
import { EmpresasHomeComponent } from './empresas-home/empresas-home.component';
import { ConductoresHomeComponent } from './conductores-home/conductores-home.component';
import { PedidosHomeComponent } from './pedidos-home/pedidos-home.component';
import { HelloHomeComponent } from './hello-home/hello-home.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RastrearHomeComponent } from './rastrear-home/rastrear-home.component';
import { PasajerosHomeComponent } from './pasajeros-home/pasajeros-home.component';
import { ReportesHomeComponent } from './reportes-home/reportes-home.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home', component: HomeComponent,
    children: [
      { path: '', component: HelloHomeComponent},
      { path: 'rastrear', component: RastrearHomeComponent},
      { path: 'pedidos', component: PedidosHomeComponent},
      { path: 'pasajeros', component: PasajerosHomeComponent},
      { path: 'conductores', component: ConductoresHomeComponent},
      { path: 'empresas', component: EmpresasHomeComponent},
      { path: 'pagos', component: PagosHomeComponent},
      { path: 'reportes', component: ReportesHomeComponent},
      { path: 'anuncios', component: AnunciosHomeComponent},

    ]
  },
  { path: '', component: WelcomeComponent },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
