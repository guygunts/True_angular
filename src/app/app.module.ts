import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ListpackgetComponent } from './listpackget/listpackget.component';
import { PackgetmanagmentComponent } from './packgetmanagment/packgetmanagment.component';
import { UsermanagmentComponent } from './usermanagment/usermanagment.component';
import { ReportComponent } from './report/report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ListpackgetComponent,
    PackgetmanagmentComponent,
    UsermanagmentComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }