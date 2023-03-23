import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sidebarState: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  public show() {
    this.sidebarState.emit(true);
  }

  public hide() {
    this.sidebarState.emit(false);
  }
}
