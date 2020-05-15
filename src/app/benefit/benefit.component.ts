import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.css'],
})
export class BenefitComponent implements OnInit {
  constructor(private authService: AuthService) {}

  benefitData;
  ngOnInit(): void {
    this.authService.getBenefitData().subscribe((data) => {
      this.benefitData = data;
      console.log('benefit data');
      console.log(data);
    });
  }
}
