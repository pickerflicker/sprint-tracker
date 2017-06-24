import { Component, Input } from '@angular/core';
import { Story } from './story';

@Component({
  selector: 'board-story',
  styles: [`
    .card {
    }
  `],
  template: `
    <div class="card card-outline-primary">
      <div class="card-block">
        <h4 class="card-title">{{story.name}}</h4>
        <p class="card-text" style="word-break: break-word">{{story.description | limitTo: 100}}</p>
        <a target="_blank" href="{{story.url}}" class="card-link">Story link</a>
      </div>
      <ul class="list-group list-group-flush">
       <li class="list-group-item">Estimate: {{story.estimate}}</li>
       <li class="list-group-item">Labels: {{story.labels | storyLabel}}</li>
       <li class="list-group-item">Owners: {{story.owner_ids.join(', ')}}</li>
     </ul>
    </div>
  `
})

export class BoardStoryComponent {
  @Input() story: Story;
}
