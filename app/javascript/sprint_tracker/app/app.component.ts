import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <project-board></project-board>

  `
})

export class AppComponent {
  title = 'Sprint Tracker';
}
