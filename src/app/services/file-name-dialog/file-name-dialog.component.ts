import { Component, OnInit,  Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-file-name-dialog',
  templateUrl: './file-name-dialog.component.html',
  styleUrls: ['./file-name-dialog.component.css']
})
export class FileNameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FileNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.data.choice=true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
