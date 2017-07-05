import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'api-key-capture',
  styles: [],
  template: `
    <div class="container">
      <div class="row">
        <form class="col-xs-4">
          <div class="form-group">
            <label for="pivotalApiKey" class="control-label">Pivotal API Key</label>
            <i>(Found under Profile -> API Token)</i>
            <input required type="email" [(ngModel)]="apiKey" class="form-control" id="pivotalApiKey" name="email_name">
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary" (click)="submitKey()">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `,
  providers: [
    { provide: 'LocalStorage', useValue: window.localStorage }
  ]
})

export class ApiKeyCaptureComponent {
  apiKey: string;
  localStorage = null;

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.localStorage = localStorageService.getNative();
  }

  ngOnInit(): void {
    let key = this.localStorage.getItem('pivotalApiKey');
    if (key) {
      this.router.navigate(['tracker']);
    }
  }

  submitKey(): void {
    if (this.apiKey) {
      this.localStorage.setItem('pivotalApiKey', this.apiKey);
      this.router.navigate(['tracker']);
    }
  }

}
