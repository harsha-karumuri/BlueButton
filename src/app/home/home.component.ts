import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  patientData;
  coverageData;
  benefitData;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.code) {
        localStorage.setItem("code", params.code);
        localStorage.setItem("state", params.state);

        this.authService.getAuthTokenData().subscribe((data) => {
          this.authService.authData = data;

          this.authService.getPatientData().subscribe(
            (patientData) => (this.patientData = patientData),
            (error) => {
              console.log(error);
            }
          );
          this.authService.getCoverageData().subscribe(
            (coverageData) => (this.coverageData = coverageData),
            (error) => {
              console.log(error);
            }
          );
          this.authService.getBenefitData().subscribe(
            (benefitData) => (this.benefitData = benefitData),
            (error) => {
              console.log(error);
            }
          );
        });

        // this.authService.getRefreshedAuthToken().subscribe(
        //   (data) => {
        //     this.authService.getPatientData().subscribe(
        //       (patientData) => (this.patientData = patientData),
        //       (error) => {
        //         console.log(error);
        //       }
        //     );
        //     this.authService.getCoverageData().subscribe(
        //       (coverageData) => (this.coverageData = coverageData),
        //       (error) => {
        //         console.log(error);
        //       }
        //     );
        //     this.authService.getBenefitData().subscribe(
        //       (benefitData) => (this.benefitData = benefitData),
        //       (error) => {
        //         console.log(error);
        //       }
        //     );
        //     console.log(data);
        //   },
        //   (error) => {
        //     console.log(error);
        //   }
        // );
      }
    });

    this.authService.changeVisibility();
  }

  // getAuthToken() {
  //   this.authService.getAuthTokenData();
  // }
}
