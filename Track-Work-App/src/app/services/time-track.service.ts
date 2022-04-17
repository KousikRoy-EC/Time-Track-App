import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mymodel } from '../Time';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackService {
  private PATH_NAME = window.location.pathname.split('/')[1];
  public baseUrl = 'http://127.0.0.1:8000/api/time';
  public generate = 'http://127.0.0.1:8000/api/generate';
  constructor(private http: HttpClient) {}

  saveTimer(data: Mymodel): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getAlldata(): Observable<any> {
    return this.http.get(this.generate);
  }

  getDataById(id: string): Observable<any> {
    return this.http.get(this.generate + '/' + id);
  }
}
