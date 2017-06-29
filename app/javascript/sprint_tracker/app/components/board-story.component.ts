import { Component, Input } from '@angular/core';
import { Story } from '../models/story';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: '[board-story]',
  styles: [`
    .label {
      margin-right: 2px;
    }

    .badge {
      font-size: 0.7em;
    }
  `],
  template: `
    <p>
      <span *ngIf="story.story_type === 'bug'"><i class="fa fa-bug text-danger" aria-hidden="true"></i></span>
      <span *ngIf="story.story_type === 'feature'"><i class="fa fa-star text-warning" aria-hidden="true"></i></span>
      <span *ngIf="story.story_type === 'chore'"><i class="fa fa-cog" aria-hidden="true"></i></span>
      [<a target="_blank" href="{{story.url}}" class="card-link">{{story.id}}</a>]
      <span *ngIf="story.estimate" class="badge">{{story.estimate}} points</span>
      <br />
      {{story.name}}
      <br />
      Owners: <span class="label label-primary" *ngFor="let user of getUsers(story.owner_ids)">{{user.initials}}</span>
    </p>
    <div>
      <span class="label label-default" *ngFor="let label of story.labels">
        {{label}}
      </span>
    </div>
  `
})

export class BoardStoryComponent {
  @Input() story: Story;
  userService: UserService

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers(userIds): User[] {
    return userIds.map( userId => {
      return this.userService.getUsers().find(user => { return user.id === userId });
    });
  }
}
