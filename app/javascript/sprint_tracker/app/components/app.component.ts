import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h1>{{title}}</h1>
      <project-board class="board-container"></project-board>
    </div>
  `,
  styles: [`
    .board-container {
      display: flex;
    }
  `],
})

export class AppComponent {
  title = 'Sprint Tracker';
}
