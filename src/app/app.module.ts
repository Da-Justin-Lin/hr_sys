import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { SaveComponent } from './save';
import { UpdateComponent } from './update';
import { AddressComponent } from './address/address.component';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SaveComponent,
    UpdateComponent,
    AddressComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    appRoutingModule,
    FormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
