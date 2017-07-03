import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { User } from '../models/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
  users: User[];

  constructor (private http: Http) {}

  getAll(projectId: number): Observable<User[]> {
    let headers = new Headers();
    headers.append('X-TrackerToken', 'f11effcf77851d80566c782851dfd012')

    return this.http.get(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/memberships?fields=person`,
      { headers: headers }
    ).map((res:Response) => {
      this.users = res.json().map((data) => {
        let user = data.person;
        return new User({
          id: user.id,
          name: user.name,
          email: user.email,
          initials: user.initials,
          username: user.username,
        });
      });
      return this.users;
    })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUsers(): User[] {
    return this.users;
  }
}
