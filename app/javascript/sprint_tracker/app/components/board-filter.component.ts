import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Story } from '../models/story';

@Component({
  selector: 'board-filter',
  template: `
    <div class="col-sm-1">
      <div>
        <label>
          <input type="checkbox" name="ios" [(ngModel)]="filters.ios" (ngModelChange)="filter()">
            iOS
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="platform" [(ngModel)]="filters.platform" (ngModelChange)="filter()">
            platform
        </label>
      </div>
    </div>
    <div class="col-sm-1">
      <div class="form-group">
        <label>
          Label
        </label>
        <div class="dropdown">
          <button class="btn btn-default dropdown-toggle" type="button" id="filterDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            none
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="filterDropdownMenu">
            <li><a href="#">ios</a></li>
            <li><a href="#">platform</a></li>
            <li><a href="#">other</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-1">
      <button class="btn btn-default" (click)="resetFilters()">Reset All Filters</button>
    </div>
  `,
  styles: [`
  `],
})

export class BoardFilterComponent {
  @Input() allStories: Story[];
  @Output() onFiltered = new EventEmitter<Story[]>();
  filteredStories: Story[];
  filters = { ios: false, platform: false, text: null, label: null };

  ngOnInit() {
    this.filteredStories = this.allStories;
  }

  filter(): void {
    this.filteredStories = this.allStories;

    if (this.filters.ios) {
      this.filteredStories = this.filteredStories.filter(story => {
        return story.labels.indexOf('ios') > -1;
      });
    }

    if (this.filters.platform) {
      this.filteredStories = this.filteredStories.filter(story => {
        return story.labels.indexOf('platform') > -1;
      });
    }

    if (this.filters.label) {
      this.filteredStories = this.filteredStories.filter(story => {
        return story.labels.indexOf(this.filters.label) > -1;
      });
    }

    if (this.filters.text) {
      this.filteredStories = this.filteredStories.filter(story => {
        return story.name.indexOf(this.filters.text) > -1 || story.description.indexOf(this.filters.text) > -1;
      });
    }

    this.onFiltered.emit(this.filteredStories);
  }

  resetFilters(): void {
    this.filters = { ios: false, platform: false, text: null, label: null };
    this.filteredStories = this.allStories;
    this.filter();
  }
}
