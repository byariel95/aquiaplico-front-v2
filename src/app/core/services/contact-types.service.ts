import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractTypesService {
  private API_URL = environment.root;

  constructor(private http: HttpClient) {}

  getContractTypes(): Observable<any> {
    const url = this.API_URL + 'contract-types';
    return this.http.get(url);
  }
}
