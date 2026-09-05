// components/confirm-dialog/confirm-dialog.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close(false)">Cancelar</button>
      <button mat-raised-button color="warn" (click)="dialogRef.close(true)">Remover</button>
    </mat-dialog-actions>
  `,
  styles: [`
    h2 {
      color: #fff !important;
      font-weight: 700 !important;
      font-size: 20px;
    }

    mat-dialog-content {
      color: #ccc !important;
      font-size: 14px;
    }

    button[mat-button] {
      color: #fff !important;
      font-weight: 600 !important;
    }

    button[mat-raised-button] {
      background-color: #e53935 !important;
      color: #fff !important;
      font-weight: 700 !important;
      border-radius: 20px !important;
      box-shadow: 0 2px 8px rgba(229, 57, 53, 0.35) !important;
    }

    button[mat-raised-button]:hover {
      background-color: #f4453f !important;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}
}