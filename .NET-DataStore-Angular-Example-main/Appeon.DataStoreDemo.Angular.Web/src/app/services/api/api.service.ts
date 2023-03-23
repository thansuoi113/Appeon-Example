import { environment } from "./../../../environments/environment";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private static readonly ApiUrl = environment.apiUrl + "/api";
  httpHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getWithParams(endpoint: string, params: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const i of Object.keys(params)) {
      httpParams = httpParams.append(i, params[i]);
    }

    const options = {
      headers: this.httpHeader.headers,
      params: httpParams
    };

    return this.httpClient
      .get(ApiService.ApiUrl + endpoint, options)
      .pipe(retry(1), catchError(this.httpError));
  }

  public get(endpoint: string): Observable<any> {
    return this.httpClient
      .get(ApiService.ApiUrl + endpoint, this.httpHeader)
      .pipe(retry(1), catchError(this.httpError));
  }

  public post(endpoint: string, data: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(ApiService.ApiUrl + endpoint, data, {
      observe: "response",
    });
  }

  public put(endpoint: string, data: any): Observable<HttpResponse<any>> {
    return this.httpClient.put<any>(ApiService.ApiUrl + endpoint, data, {
      observe: "response",
    });
  }

  public delete(endpoint: string, body: any = null): Observable<HttpResponse<any>> {
    return this.httpClient.request<any>('delete', ApiService.ApiUrl + endpoint, {
      observe: "response",
      body: body
    });
  }

  public getUrl(endpoint: string): string {
    return ApiService.ApiUrl + endpoint;
  }

  httpError(error) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
