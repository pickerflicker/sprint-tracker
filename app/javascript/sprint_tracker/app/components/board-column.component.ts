import { Component, Input } from '@angular/core';
import { Story } from '../models/story';
import { User } from '../models/user';

@Component({
  selector: 'board-column',
  template: `
    <div class="panel panel-primary">
      <div class="panel-heading">{{state}}</div>
      <div class="panel-body" dnd-sortable-container [dropZones]="['boxers-zone']" [sortableData]="stories">
        <ul class="list-group">
          <li board-story *ngFor="let story of stories; let i = index" [story]="story" class="list-group-item" dnd-sortable [sortableIndex]="i" (onDropSuccess)="moveStory(story)"></li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .panel {
      height: 100%;
    }

    .list-group {
      min-width: 300px;
    }
  `]
})

export class BoardColumnComponent {
  @Input() stories: Story[];
  @Input() state: string;

  moveStory(story: Story) : void {
    story.current_state;
    //
    //   use labels for everything!
    //      - current_state = label || state
    //      - remove any old labels
    //      - add new label
    //      - if new state is a state, update state too
    //
    // this.states = ['unstarted', 'started', 'finished', 'delivered', 'accepted', 'merged'];
    // this.labelStates = ['merged'];
  }
}
