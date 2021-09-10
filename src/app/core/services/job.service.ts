import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { jobModel } from '../models/post-job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private API_URL = environment.root;

  constructor(private http: HttpClient) { }

  createPostJob(job: jobModel) {
    const url = this.API_URL + 'jobs/new';
    return this.http.post(url, job );
  }

}
