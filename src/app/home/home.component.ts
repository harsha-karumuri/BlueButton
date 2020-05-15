import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.code) {
        localStorage.setItem('code', params.code);
        localStorage.setItem('state', params.state);

        this.authService.getAuthTokenData().subscribe((data) => {
          this.authService.authData = data;
          localStorage.setItem('auth_token', this.authService.authData.access_token);
          this.authService.getPatientData();
          this.authService.getCoverageData();
          this.authService.getBenefitData();
        });
      }
    });

    this.authService.changeVisibility();
  }

  visible = this.authService.makeVisible;

  // getAuthToken() {
  //   this.authService.getAuthTokenData();
  // }
}
