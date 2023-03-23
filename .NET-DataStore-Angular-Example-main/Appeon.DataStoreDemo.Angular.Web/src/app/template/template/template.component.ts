import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from 'src/app/services/ui/sidebar.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidebar: MatSidenav;

  isExpanded = true;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarState.subscribe((state) => {
      this.isExpanded = state;
    });
  }

  ngOnDestroy() {
    this.sidebarService.sidebarState.unsubscribe();
  }
}
