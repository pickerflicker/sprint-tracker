import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from '../models/story';
import { LabelService } from '../services/label.service';

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
      <button class="btn btn-info btn-xs" (click)="resetFilters()">Reset All Filters</button>
    </div>
    <div class="col-sm-2">
      <div class="form-group">
        <label>
          Label:
        </label>
        <select class="form-control" [(ngModel)]="filters.label" (ngModelChange)="filter()">
          <option *ngFor="let label of allLabels">
            {{label}}
          </option>
        </select>
      </div>
    </div>
    <div class="col-sm-2">
    <div class="form-group">
      <label for="usr">Search:</label>
      <input type="text" class="form-control" [(ngModel)]="filters.text" (ngModelChange)="filter()">
    </div>
  `,
  styles: [`
  `],
})

export class BoardFilterComponent {
  @Input() allStories: Story[];
  @Input() projectId: number;
  @Output() onFiltered = new EventEmitter<Story[]>();
  filteredStories: Story[];
  filters = { ios: false, platform: false, text: null, label: null };
  allLabels: string[];

  constructor(private labelService: LabelService, private router: Router) {}

  ngOnInit() {
    this.filteredStories = this.allStories;
    this.labelService.getAll(this.projectId).subscribe(
      data => this.allLabels = data,
      err => this.router.navigate([''])
    );
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
      let terms = this.filters.text.trim().toLowerCase().split(/\s+/);
      this.filteredStories = this.filteredStories.filter(story => {
        return terms.some(function(term) {
          return (story.name || '').toLowerCase().indexOf(term) > -1 ||
            (story.description || '').toLowerCase().indexOf(term) > -1;
        });
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
