import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustSpeedComponent } from './adjust-speed/adjust-speed.component';
import { GeneratelicenseComponent } from './generatelicense/generatelicense.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { PlanOffersComponent } from './plan-offers/plan-offers.component'
import { NotfoundComponent } from './notfound/notfound.component'
import { HomeComponent } from './home/home.component'
import { UsermanagementComponent } from './usermanagement/usermanagement.component'
import { SpeedmappingComponent } from './speedmapping/speedmapping.component'
import { ErrorcodeComponent } from './errorcode/errorcode.component'
import { NotifymappingComponent } from './notifymapping/notifymapping.component'
import { authpaths } from './authrouter';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'AdjustSpeed', component: AdjustSpeedComponent, canActivate: [authpaths] },
  { path: 'Generatelicense', component: GeneratelicenseComponent, canActivate: [authpaths] },
  { path: 'blacklist', component: BlacklistComponent, canActivate: [authpaths] },
  { path: 'offer', component: PlanOffersComponent, canActivate: [authpaths] },
  { path: 'usermanagement', component: UsermanagementComponent, canActivate: [authpaths] },
  { path: 'speedmap', component: SpeedmappingComponent, canActivate: [authpaths] },
  { path: 'errorcode', component: ErrorcodeComponent, canActivate: [authpaths] },
  { path: 'notify', component: NotifymappingComponent, canActivate: [authpaths] },
  { path: 'home', component: HomeComponent, },
  { path: '**', component: NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
