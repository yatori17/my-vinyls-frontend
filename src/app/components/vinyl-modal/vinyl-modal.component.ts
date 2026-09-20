import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Vinyl } from '../../models/vinyl.model';

@Component({
  selector: 'app-vinyl-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './vinyl-modal.component.html',
  styleUrl: './vinyl-modal.component.css',
})
export class VinylModalComponent {
  constructor(
    public dialogRef: MatDialogRef<VinylModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message?: string; vinyl?: Vinyl }
  ) {}
  
   getStateClass(state: string): string {
    if (state.includes('Novo') || state.includes('M')) return 'novo';
    if (state.includes('Excelente') || state.includes('NM')) return 'excelente';
    return 'bom';
  }
}