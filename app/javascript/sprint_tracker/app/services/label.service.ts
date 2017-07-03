import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LabelService {
  labels: string[];

  constructor (private http: Http) {}

  getAll(): Observable<string[]> {
    let headers = new Headers();
    headers.append('X-TrackerToken', 'f11effcf77851d80566c782851dfd012')

    return this.http.get('https://www.pivotaltracker.com/services/v5/projects/1589495/labels?fields=name',
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
