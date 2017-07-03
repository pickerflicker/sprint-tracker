import { Component, OnInit } from '@angular/core';

import { Project } from '../models/project';
import { Story } from '../models/story';
import { Iteration } from '../models/iteration';
import { User } from '../models/user';
import { ProjectService } from '../services/project.service';
import { StoryService } from '../services/story.service';
import { UserService } from '../services/user.service';
import { BoardColumnComponent } from '../components/board-column.component';

@Component({
  selector: 'project-board',
  styles: [`
    .board-column {
      width: 100%;
    }

    .board-container {
      display: flex;
    }

    .header {
      padding: 15px 0 0 15px;
    }
  `],
  template: `
    <div class="row header">
      <div class="col-sm-3"><h1>{{title}}</h1>
        <h5 *ngIf="iteration">({{iteration.start.toDateString()}} - {{iteration.finish.toDateString()}})</h5>
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label>
            Select Project
          </label>
          <select class="form-control" [(ngModel)]="currentProjectId" (ngModelChange)="changeProject()">
            <option *ngFor="let project of projects" [ngValue]="project.id">
              {{project.name}}
            </option>
          </select>
        </div>
      </div>
      <board-filter *ngIf="allStories.length > 0" [allStories]="allStories" [projectId]="currentProjectId" (onFiltered)="onFiltered($event)"></board-filter>
    </div>
    <div class="board-container">
      <board-column *ngFor="let state of states" class="board-column" [projectId]="currentProjectId" [stories]="groupedStories[state]" [state]="state"></board-column>
    </div>
  `,
})

export class BoardComponent implements OnInit {
  projectService: ProjectService;
  storyService: StoryService;
  userService: UserService;
  states: string[];
  labelStates: string[];
  allStates: string[];
  groupedStories: {};
  allStories: Story[];
  iteration: Iteration;
  projects: Project[];
  title = 'Sprint Tracker';
  currentProjectId: number;

  constructor(projectService: ProjectService, storyService: StoryService, userService: UserService) {
    this.projectService = projectService;
    this.storyService = storyService;
    this.userService = userService;
    this.states = ['unstarted', 'started', 'finished', 'delivered', 'accepted', 'merged'];
    this.labelStates = ['merged'];
    this.allStates = this.states.concat(this.labelStates);
    this.groupedStories = {};
    this.allStories = [];
  }

  onFiltered(stories: Story[]): void {
    this.resetGroupedStories();
    this.parseStories(stories);
  }

  getStories(): void {
    this.storyService.getCurrentIteration(this.currentProjectId).subscribe(data => {
      this.iteration = data;
      this.allStories = this.iteration.stories;
      this.parseStories(this.allStories);
    });
  }

  getUsersAndStories(): void {
    this.userService.getAll(this.currentProjectId).subscribe(data => {
      this.getStories();
    });
  }

  parseStories(stories: Story[]): void {
    stories.forEach( story => {
      if (story['story_type'] != 'release') {
        let storyState = story.labels.find( label => {
          return this.allStates.indexOf(label) > -1;
        });
        this.groupedStories[storyState || story['current_state']].push(story);
      }
    });
  }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(data => {
      this.projects = data;
      if (this.projects.length > 0) {
        this.currentProjectId = this.projects[0].id;
        this.resetGroupedStories();
        this.getUsersAndStories();
      }
    });
  }

  resetGroupedStories(): void {
    this.states.forEach( state => this.groupedStories[state] = []);
  }

  changeProject(): void {
    this.resetGroupedStories();
    this.getUsersAndStories();
  }
}
