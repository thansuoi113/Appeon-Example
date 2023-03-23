import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable()
export class PNotifyService {
  getPNotify() {
    PNotifyButtons; // Initiate the module. Important!
    PNotify.defaults.styling = 'bootstrap4';
    // This icon setting requires the Material Icons font. (See below.)
    PNotify.defaults.icon = true;
    PNotify.defaults.delay = 3000;
    return PNotify;
  }
}
