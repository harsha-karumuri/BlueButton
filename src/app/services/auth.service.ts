import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  authData;
  makeVisible: boolean = true;

  changeVisibility() {
    this.makeVisible = !this.makeVisible;
  }

  getAuthTokenData() {
    return this.http.post(`http://localhost:3000/getAuth`, {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }

  getRefreshedAuthToken() {
    return this.http.post(`http://localhost:3000/getRefreshedAuth`, {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }

  getPatientData() {
    return this.http.get(`http://localhost:3000/getPatientData`, {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }

  getCoverageData() {
    return this.http.get(`http://localhost:3000/getCoverageData`, {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }

  getBenefitData() {
    return this.http.get(`http://localhost:3000/getBenefitData`, {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }
}
