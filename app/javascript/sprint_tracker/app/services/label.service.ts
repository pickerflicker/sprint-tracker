import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class LabelService {
  labels: string[];

  constructor (private http: Http, private localStorageService: LocalStorageService) {}

  getAll(projectId: number): Observable<string[]> {
    let headers = new Headers();
    let key:string = this.localStorageService.getNative().getItem('pivotalApiKey');
    headers.append('X-TrackerToken', key);

    return this.http.get(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/labels?fields=name`,
      { headers: headers }
    ).map((res:Response) => {
      this.labels = res.json().map((data) => {
        return data.name;
      });
      return this.labels;
    })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
