import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndustryService {
  private API_URL = environment.root;

  constructor(private http: HttpClient) {}

  getIndustries(): Observable<any> {
      const url = this.API_URL + 'industries';
      return this.http.get(url);
  }
}
