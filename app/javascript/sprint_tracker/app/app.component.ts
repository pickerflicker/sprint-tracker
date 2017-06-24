import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container-fluid">
      <h1>{{title}}</h1>
      <project-board></project-board>
    </div>
  `
})

export class AppComponent {
  title = 'Sprint Tracker';
}
