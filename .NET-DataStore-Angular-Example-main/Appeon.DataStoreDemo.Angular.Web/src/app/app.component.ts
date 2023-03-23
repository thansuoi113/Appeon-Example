import { SidebarService } from './services/ui/sidebar.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '.Net DataStore Angular Demo';

}
