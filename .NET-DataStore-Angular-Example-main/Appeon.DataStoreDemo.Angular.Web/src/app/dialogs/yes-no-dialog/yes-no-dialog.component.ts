import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css'],
})
export class YesNoDialogComponent implements OnInit {
  title: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;

  constructor(
    private dialog: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (!data) {
      this.title = 'Title';
      this.text = 'Text';
      this.confirmButtonText = 'Ok';
      this.cancelButtonText = 'Cancel';
    }
    else {
      this.title = data.title ?? 'Title';
      this.text = data.text ?? 'Text';
      this.confirmButtonText = data.confirmButtonText ?? 'Ok';
      this.cancelButtonText = data.confirmButtonText ?? 'Cancel';
    }

  }

  ngOnInit(): void { }

  confirm() {
    console.log('confirming');
    this.data.confirmed = true;
    this.dialog.close({
      confirmed: true
    });
  }
}

