import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Project } from '../models/project';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class ProjectService {
  projects: Project[];

  constructor (private http: Http, private localStorageService: LocalStorageService) {}

  getAll(): Observable<Project[]> {
    let headers = new Headers();
    let key:string = this.localStorageService.getNative().getItem('pivotalApiKey');
    headers.append('X-TrackerToken', key)

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
