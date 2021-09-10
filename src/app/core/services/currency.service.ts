import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
    private API_URL = environment.root;

    constructor(private http: HttpClient) {}
  
    getCurrencies(): Observable<any> {
      const url = this.API_URL + 'currencies';
      return this.http.get(url);
    }
}
