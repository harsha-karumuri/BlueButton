import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { CoverageComponent } from './coverage/coverage.component';
import { BenefitComponent } from './benefit/benefit.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PatientDetailsComponent, CoverageComponent, BenefitComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, MatTabsModule, MatCardModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
