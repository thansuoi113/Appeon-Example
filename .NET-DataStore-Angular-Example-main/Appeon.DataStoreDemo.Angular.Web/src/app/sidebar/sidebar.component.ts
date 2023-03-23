import { SessionService } from './../services/session/session.service';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { faChevronDown, faEdit, faHome, faPaw } from '@fortawesome/free-solid-svg-icons';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  _isExpanded: boolean;
  @Input()
  get isExpanded() {
    return this._isExpanded;
  }
  set isExpanded(expanded: boolean) {
    this._isExpanded = expanded;
    if (!expanded) {
      this.closedSidebar();
    }
    else this.openedSidebar();
  }

  expansionPanelOpenWhenSidebarClosed = false;

  @ViewChild(MatExpansionPanel)
  expansionPanel: MatExpansionPanel;

  faPaw = faPaw;
  faHome = faHome;
  faEdit = faEdit;
  faChevron = faChevronDown;

  username: string;
  constructor(private sessionService: SessionService) {
    this.username = sessionService.getUser().username;
  }

  ngOnInit(): void {
  }

  closedSidebar() {
    console.log('closed');
    console.log(this.expansionPanel);
    this.expansionPanelOpenWhenSidebarClosed = this.expansionPanel.expanded;
    this.expansionPanel.close();
  }

  openedSidebar() {
    if (this.expansionPanel) {
      if (this.expansionPanelOpenWhenSidebarClosed)
        this.expansionPanel.open();
      else
        this.expansionPanel.close();
    }
  }

}
