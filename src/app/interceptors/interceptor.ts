import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Interceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders().append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    if (request.url.includes("getAuth")) {
      headers = headers
        .append("code", localStorage.getItem("code"))
        .append("state", localStorage.getItem("state"));
    }

    request = request.clone({
      headers: headers,
    });

    return next.handle(request);
  }
}
