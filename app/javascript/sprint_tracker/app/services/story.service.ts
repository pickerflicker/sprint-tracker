import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Story } from '../models/story';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StoryService {
  constructor (private http: Http) {}

  getCurrentIteration(): Observable<Story[]> {
    let headers = new Headers();
    headers.append('X-TrackerToken', 'f11effcf77851d80566c782851dfd012')

    return this.http.get('https://www.pivotaltracker.com/services/v5/projects/1589495/iterations?scope=current',
      { headers: headers }
    ).map((res:Response) => {
      return res.json()[0].stories.map((story) => {
        return new Story({
          id: story.id,
          story_type: story.story_type,
          name: story.name,
          description: story.description,
          current_state: story.current_state,
          url: story.url,
          estimate: story.estimate,
          owner_ids: story.owner_ids,
          labels: story.labels,
        });
      });

    })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
