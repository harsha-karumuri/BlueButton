import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.css'],
})
export class CoverageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  @Input() coverageData: any;
  ngOnInit(): void {
    console.log(this.coverageData);
  }
}
