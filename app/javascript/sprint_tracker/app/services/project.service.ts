import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Project } from '../models/project';

@Injectable()
export class ProjectService {
  projects: Project[];

  constructor (private http: Http) {}

  getAll(): Observable<Project[]> {
    let headers = new Headers();
    headers.append('X-TrackerToken', 'f11effcf77851d80566c782851dfd012')

    return this.http.get('https://www.pivotaltracker.com/services/v5/me?fields=projects',
      { headers: headers }
    ).map((res:Response) => {
      this.projects = res.json().projects.map((data) => {
        return new Project(data);
      });
      return this.projects;
    })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
