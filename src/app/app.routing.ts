import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { SaveComponent } from './save';
import { UpdateComponent } from './update';
import { AddressComponent } from './address/address.component';

// Routes for different functions and pages
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'save', component: SaveComponent },
    { path: 'update/:id', component: UpdateComponent },
    { path: 'address/:id', component: AddressComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);