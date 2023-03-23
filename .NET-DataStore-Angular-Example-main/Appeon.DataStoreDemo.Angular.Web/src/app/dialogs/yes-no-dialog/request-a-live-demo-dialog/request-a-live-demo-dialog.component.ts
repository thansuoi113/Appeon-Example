import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-request-a-live-demo-dialog',
  templateUrl: './request-a-live-demo-dialog.component.html',
  styleUrls: ['./request-a-live-demo-dialog.component.css']
})
export class RequestALiveDemoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RequestALiveDemoDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onYesClick(){
    this.dialogRef.close();
    var requestDemoWindow:any=window.open();
    requestDemoWindow.opener=null;
    requestDemoWindow.location='https://www.appeon.com/products/request-a-live-demo.html';
  }
}
