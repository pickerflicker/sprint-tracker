import { Component, OnInit } from '@angular/core';

import { Story } from '../models/story';
import { User } from '../models/user';
import { StoryService } from '../services/story.service';
import { UserService } from '../services/user.service';
import { BoardColumnComponent } from '../components/board-column.component';

@Component({
  selector: 'project-board',
  styles: [`
    .board-column {
      width: 100%;
    }
  `],
  template: `
    <board-column *ngFor="let state of states" class="board-column" [stories]="groupedStories[state]" [state]="state"></board-column>
  `,
  providers: [StoryService],
})

export class BoardComponent implements OnInit {
  storyService: StoryService
  userService: UserService
  states: string[];
  labelStates: string[];
  groupedStories: {};

  constructor(storyService: StoryService, userService: UserService) {
    this.storyService = storyService;
    this.userService = userService;
    this.states = ['unstarted', 'started', 'finished', 'delivered', 'accepted', 'merged'];
    this.labelStates = ['uat', 'uat approved', 'merged'];
    this.groupedStories = {};
  }

  getStories(): void {
    this.storyService.getCurrentIteration().subscribe(data => {
      var stories: Story[] = data;
      this.parseStories(stories);
    });
  }

  getUsersAndStories(): void {
    this.userService.getAll().subscribe(data => {
      this.getStories();
    });
  }

  parseStories(stories: Story[]): void {
    stories.forEach( story => {
      if (story['story_type'] != 'release') {
        this.groupedStories[story['current_state']].push(story);
      }
    });
  }

  ngOnInit(): void {
    this.states.forEach( state => this.groupedStories[state] = []);
    this.getUsersAndStories();
  }
}

//<board-column [stories]="groupedStories[state]" [state]="state"></board-column>
