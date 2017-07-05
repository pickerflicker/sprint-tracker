import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  getNative() {
    return window.localStorage;
  }
}
