import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from '../models/story';
import { User } from '../models/user';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'board-column',
  template: `
    <div class="panel panel-primary">
      <div class="panel-heading">{{state}}</div>
      <div class="panel-body" dnd-sortable-container [dropZones]="['boxers-zone']" [sortableData]="stories">
        <ul class="list-group">
          <li [ngClass]="story.hasLabel('ios')?'list-item-ios':story.hasLabel('platform')?'list-item-platform':''"
            board-story *ngFor="let story of stories; let i = index" [story]="story" class="list-group-item"
            dnd-sortable [sortableIndex]="i" (onDropSuccess)="moveStory(story)"></li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .panel {
      height: 100%;
    }

    .list-group {
      min-width: 275px;
    }

    .list-group-item {
      border: 1px solid #337ab7;
      word-break: break-all;
    }

    .list-item-ios {
      background-color: lightgoldenrodyellow;
    }

    .list-item-platform {
      background-color: lavender;
    }
  `]
})

export class BoardColumnComponent {
  @Input() projectId: number;
  @Input() stories: Story[];
  @Input() state: string;

  constructor (private storyService: StoryService, private router: Router) {}

  moveStory(story: Story) : void {
    this.storyService.updateStory(this.projectId, story, this.state).subscribe(
      updatedStory => Object.assign(story, updatedStory),
      err => this.router.navigate([''])
    );
  }
}
