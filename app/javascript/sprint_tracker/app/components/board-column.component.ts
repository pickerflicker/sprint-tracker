import { Component, Input } from '@angular/core';
import { Story } from '../models/story';

@Component({
  selector: 'board-column',
  template: `
    <div class="panel panel-primary">
      <div class="panel-heading">{{state}}</div>
      <div class="panel-body" dnd-sortable-container [dropZones]="['boxers-zone']" [sortableData]="stories">
        <ul class="list-group">
          <li board-story *ngFor="let story of stories; let i = index" [story]="story" class="list-group-item" dnd-sortable [sortableIndex]="i"></li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .panel {
      height: 100%;
    }
  `]
})

export class BoardColumnComponent {
  @Input() stories: Story[];
  @Input() state: string;

  moveStory($event: any) : void {
    let newStory: Story = $event.dragData;
    debugger;
    // update pivotal label here
    this.stories.push(newStory);
  }
}
//<board-story *ngFor="let story of stories; let i = index" [story]="story"  dnd-sortable [sortableIndex]="i"></board-story>

// <div class="panel panel-warning">
//   <div class="panel-heading">{{state}}</div>
//   <div class="panel-body">
//     <ul class="list-group">
//       <board-story *ngFor="let story of stories; let i = index" [story]="story"></board-story>
//     </ul>
//   </div>
// </div>
