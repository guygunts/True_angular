import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustSpeedComponent } from './adjust-speed/adjust-speed.component';
import { GeneratelicenseComponent } from './generatelicense/generatelicense.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
const routes: Routes = [
  { path: '', redirectTo: '/Generatelicense', pathMatch: 'full' },
  { path: 'AdjustSpeed', component: AdjustSpeedComponent },
  { path: 'Generatelicense', component: GeneratelicenseComponent },
  { path: 'blacklist', component: BlacklistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
