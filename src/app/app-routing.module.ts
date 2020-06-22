import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustSpeedComponent } from './adjust-speed/adjust-speed.component';
import { GeneratelicenseComponent } from './generatelicense/generatelicense.component';

const routes: Routes = [
  // { path: '', redirectTo: '/Generatelicense', pathMatch: 'full' },
  { path: 'AdjustSpeed', component: AdjustSpeedComponent },
  { path: 'Generatelicense', component: GeneratelicenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
