import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Vinyl } from '../../services/vinyl';

@Component({
  selector: 'app-vinyl-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './vinyl-form.html',
  styleUrl: './vinyl-form.css',
})
export class VinylFormComponent {
  vinylData: Vinyl;
  isEditing: boolean;

  constructor(
    public dialogRef: MatDialogRef<VinylFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vinylData: Vinyl; isEditing: boolean }
  ) {
    this.vinylData = { ...data.vinylData };
    this.isEditing = data.isEditing;
  }

  onSubmit(): void {
    if (!this.vinylData.name || !this.vinylData.artist) {
      alert('Preencha o nome e o artista!');
      return;
    }
    this.dialogRef.close(this.vinylData);
  }
}