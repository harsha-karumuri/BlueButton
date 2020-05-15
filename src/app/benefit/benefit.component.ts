import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.css'],
})
export class BenefitComponent implements OnInit {
  constructor(private authService: AuthService) {}

  @Input() benefitData: any;
  ngOnInit(): void {}
}
