import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppService } from './app.service';
//////////////////primeng///////////////////////////
import { AccordionModule } from 'primeng/accordion';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule, KeyFilterModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
///////////////////////////////////////////////////

//////////////////////////////////////////////////
import { MatCardModule } from '@angular/material/card';
//////////////////////////////////////////////////

import { AdjustSpeedComponent } from './adjust-speed/adjust-speed.component';
import { GeneratelicenseComponent } from './generatelicense/generatelicense.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NumericDirective } from './numeric.directive';
import { BlacklistComponent } from './blacklist/blacklist.component';

import { PlanOffersComponent } from './plan-offers/plan-offers.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { SpeedmappingComponent } from './speedmapping/speedmapping.component';
import { ErrorcodeComponent } from './errorcode/errorcode.component';
import { NotifymappingComponent } from './notifymapping/notifymapping.component';
import { CustomdescriptionComponent } from './customdescription/customdescription.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AdjustSpeedComponent,
    GeneratelicenseComponent,
    NumericDirective,
    BlacklistComponent,
    PlanOffersComponent,
    NotfoundComponent,
    HomeComponent,
    UsermanagementComponent,
    SpeedmappingComponent,
    ErrorcodeComponent,
    NotifymappingComponent,
    CustomdescriptionComponent,

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
    MatExpansionModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    MenuModule,
    MatCardModule,
    MatSlideToggleModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    DropdownModule,
    ProgressBarModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    SliderModule,
    DialogModule,
    SplitButtonModule,
    MessageModule,
    KeyFilterModule,
    ChartModule,
    InputNumberModule,
    FileUploadModule

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }