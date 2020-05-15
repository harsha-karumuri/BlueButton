import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  authData;
  makeVisible: boolean = true;

  changeVisibility() {
    this.makeVisible = !this.makeVisible;
  }

  getAuthTokenData() {
    let params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('redirect_uri', 'http://localhost:4200');
    params.set('client_id', 'GTjLQQG05ifg4FnMLEPNFRXysqIrFABDJlrqy2Hn');
    params.set('client_secret', 'aYMXdCkRcDQsQOuMF4mUhtLSvmnxjXhwAkXOc6hjcyu0RqfEybovOrWfoDCqi3xCo8iVkS9XigAQcUWmtzOHf2KFwYxOKOuuIMv5mIi0OS9sNGiu7suPcP7G05deGQSv');
    params.set('code', localStorage.getItem('code'));
    params.set('state', localStorage.getItem('state'));

    return this.http.post('https://sandbox.bluebutton.cms.gov/v1/o/token/?' + params.toString(), {});
  }

  getPatientData() {
    return this.http.get(`https://sandbox.bluebutton.cms.gov/v1/fhir/Patient/-19990000001997`);
  }

  getCoverageData() {
    return this.http.get(`https://sandbox.bluebutton.cms.gov/v1/fhir/Coverage/?beneficiary=-19990000001997`);
  }

  getBenefitData() {
    return this.http.get(`https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/?patient=-19990000001997`);
  }
}
