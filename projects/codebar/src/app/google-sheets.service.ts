import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GoogleSheetsService {
  url = 'http://127.0.0.1:5000/group'

  constructor(private http: HttpClient, private headers: HttpClient) {
    this.url = 'http://127.0.0.1:5000/group';
  }

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({ "Access-Control-Allow-Origin" : "*", 'Content-Type': 'application/json' })
    };

    return this.http.get(this.url, httpOptions);
  }

  handleError(e) {
    console.log(e)
  }

}
