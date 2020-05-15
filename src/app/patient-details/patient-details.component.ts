import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  constructor(private authService: AuthService) {}

  patientData;
  ngOnInit(): void {
    // this.authService.getPatientData().subscribe((data) => {
    //   this.patientData = data;
    //   console.log('patient data');
    //   console.log(data);
    // });

    // this.authService.patientDataSub.subscribe((data) => {
    //   this.patientData = data;
    // });
    this.authService.patientDataSub.subscribe((data) => console.log(data));
  }
}
