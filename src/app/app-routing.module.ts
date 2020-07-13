import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustSpeedComponent } from './adjust-speed/adjust-speed.component';
import { GeneratelicenseComponent } from './generatelicense/generatelicense.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { PlanOffersComponent } from './plan-offers/plan-offers.component'
const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'AdjustSpeed', component: AdjustSpeedComponent },
  { path: 'Generatelicense', component: GeneratelicenseComponent },
  { path: 'blacklist', component: BlacklistComponent },
  { path: 'offer', component: PlanOffersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
