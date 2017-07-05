import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Iteration } from '../models/iteration';
import { Story } from '../models/story';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class StoryService {
  pivotalStates: string[];
  allStates: string[];

  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.pivotalStates = ['unstarted', 'started', 'finished', 'delivered', 'accepted'];
    this.allStates = ['unstarted', 'started', 'finished', 'delivered', 'accepted', 'merged'];
  }

  getCurrentIteration(projectId): Observable<Iteration> {
    let headers = new Headers();
    let key:string = this.localStorageService.getNative().getItem('pivotalApiKey');
    headers.append('X-TrackerToken', key);

    return this.http.get(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/iterations?scope=current`,
      { headers: headers }
    ).map((res:Response) => {
      return new Iteration(res.json()[0]);
    })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateStory(projectId: number, story: Story, newState: string): Observable<Story> {
    let headers = new Headers();
    let key:string = this.localStorageService.getNative().getItem('pivotalApiKey');
    headers.append('X-TrackerToken', key);
    headers.append('Content-Type', 'application/json');

    let payload = {};
    let labels = story.labels;

    // update labels
    this.allStates.forEach( label => {
      let index = labels.indexOf(label);
      if (index > -1) { labels.splice(index, 1) }
    });

    labels.push(newState);
    payload['labels'] = labels;

    if (this.pivotalStates.indexOf(newState) > -1) {
      payload['current_state'] = newState;
    }

    let url = `https://www.pivotaltracker.com/services/v5/projects/${projectId}/stories/${story.id}`;
    return this.http.put(url, JSON.stringify(payload), { headers: headers }).map((res:Response) => {
      return new Story(res.json());
    });
  }
}
