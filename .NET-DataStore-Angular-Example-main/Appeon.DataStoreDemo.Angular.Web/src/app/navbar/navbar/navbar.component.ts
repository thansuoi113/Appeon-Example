import { SidebarService } from './../../services/ui/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { faBars, faChevronDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { RequestALiveDemoDialogComponent } from 'src/app/dialogs/yes-no-dialog/request-a-live-demo-dialog/request-a-live-demo-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  faChevronDown = faChevronDown;
  faSignOutAlt = faSignOutAlt;
  sidebarStatus = true;
  constructor(private sidebarService: SidebarService, public dialog:MatDialog) {}
  
  ngOnInit(): void {}

  openDialog():void{
    const dialogRef=this.dialog.open(RequestALiveDemoDialogComponent,{
    width: '600px',
    position:{top:'20px'}
    });
  }

  public toggle() {
    if (this.sidebarStatus) {
      this.sidebarService.hide();
      this.sidebarStatus = false;
    } else {
      this.sidebarService.show();
      this.sidebarStatus = true;
    }
  }
}
