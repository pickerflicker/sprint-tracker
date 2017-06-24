import { Component, Input } from '@angular/core';
import { Story } from './story';

@Component({
  selector: 'board-column',
  template: `
    <nav class="navbar navbar-inverse bg-primary">
      <span class="navbar-brand">{{state}}</span>
    </nav>
    <board-story *ngFor="let story of stories" [story]="story"></board-story>
  `
})

export class BoardColumnComponent {
  @Input() stories: Story[];
  @Input() state: string;
}
