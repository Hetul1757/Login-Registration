import {Component, Inject, Injectable} from '@angular/core';
//import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FileNameDialogComponent } from '../file-name-dialog/file-name-dialog.component';

@Component({
  templateUrl: 'error-dialog.component.html'
})

export class ErrorDialogComponent {
 fileNameDialogRef: MatDialogRef<FileNameDialogComponent>;

  constructor(private dialog: MatDialog) {}

  openAddFileDialog() {
    this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent, {
      hasBackdrop: false
    });
  }
}