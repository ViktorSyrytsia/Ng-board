import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-dialog',
  template: `
    <h1 mat-dialog-title>List</h1>
    <div mat-dialog-content>
      <p>What shall we call this list?</p>
      <mat-form-field>
        <input placeholder="title" matInput [(ngModel)]="data.title" />
      </mat-form-field>
      <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>Create</button>
    </div>
    </div>
  `,
  styles: [
  ]
})
export class ListDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<ListDialogComponent  >,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

    onNoClick() {
      this.dialogRef.close();
    }

}
