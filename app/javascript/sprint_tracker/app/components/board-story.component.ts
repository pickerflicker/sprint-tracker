import { Component, Input } from '@angular/core';
import { Story } from '../models/story';

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
      [<a target="_blank" href="{{story.url}}" class="card-link">{{story.id}}</a>] <span class="badge">{{story.estimate}}</span> {{story.name}}
      <br/>
      Owners: {{story.owner_ids}}
    </p>
    <div>
      <span class="label label-default" *ngFor="let label of story.labels; let i = index">
        {{label.name}}
      </span>
    </div>
  `
})

export class BoardStoryComponent {
  @Input() story: Story;
}

// <li class="list-group-item">
//   {{story.name}}
// </li>

// <div class="card card-outline-primary" dnd-draggable [dragEnabled]="true" [dragData]="story" [dropZones]="['demo1']">
// <div>
//   <div class="card-block">
//     <h4 class="card-title"></h4>
//     <p class="card-text" style="word-break: break-word">{{story.description | limitTo: 100}}</p>
//     <a target="_blank" href="{{story.url}}" class="card-link">Story link</a>
//   </div>
//   <ul class="list-group list-group-flush">
//    <li class="list-group-item">Estimate: {{story.estimate}}</li>
//    <li class="list-group-item">Labels: {{story.labels | storyLabel}}</li>
//    <li class="list-group-item">Owners: {{story.owner_ids.join(', ')}}</li>
//  </ul>
