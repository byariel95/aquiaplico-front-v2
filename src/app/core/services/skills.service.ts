import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private API_URL = environment.root;

  constructor(private http: HttpClient) {}

  getSkills(): Observable<any> {
      const url = this.API_URL + 'skills';
      return this.http.get(url);
  }
}
