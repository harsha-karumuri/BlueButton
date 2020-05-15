import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.css'],
})
export class CoverageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  coverageData;
  ngOnInit(): void {
    this.authService.getCoverageData().subscribe((data) => {
      this.coverageData = data;
      console.log('coverage data');
      console.log(data);
    });
  }
}
