import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Vinyl } from '../../services/vinyl.service';

@Component({
  selector: 'app-vinyl-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="modal-header">
      <div class="disc-icon">💿</div>
      <div>
        <h2 mat-dialog-title>{{ data.vinyl?.name || data.title }}</h2>
        <p class="artist" *ngIf="data.vinyl">{{ data.vinyl.artist }}</p>
      </div>
    </div>

    <mat-dialog-content>
      <p *ngIf="data.message">{{ data.message }}</p>

      <div *ngIf="data.vinyl" class="details-grid">
        <div class="detail-item">
          <span class="label">Ano</span>
          <span class="value">{{ data.vinyl.year }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Gênero</span>
          <span class="value">{{ data.vinyl.genre }}</span>
        </div>
        <div class="detail-item full-width">
          <span class="label">Estado de Conservação</span>
          <span class="state-badge">{{ data.vinyl.conservation_state }}</span>
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fechar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      background: #181818;
      color: #fff;
      padding: 20px;
      border-radius: 8px;
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .modal-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 4px;
    }

    .disc-icon {
      font-size: 32px;
      line-height: 1;
    }


    h2 {
      color: #fff !important;
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
    }

    .artist {
      color: #b3b3b3;
      font-size: 14px;
      margin: 2px 0 0;
    }

    mat-dialog-content p {
      color: #ccc;
      font-size: 14px;
    }

    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #2a2a2a;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-item.full-width {
      grid-column: 1 / -1;
    }

    .label {
      color: #888;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .value {
      color: #fff;
      font-size: 15px;
      font-weight: 500;
    }

    .state-badge {
      display: inline-block;
      width: fit-content;
      background: rgba(29, 185, 84, 0.15);
      color: #1db954;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
    }

    button {
      color: #1db954 !important;
      font-weight: bold;
    }
    mat-dialog-actions {
  padding-top: 8px;
}

button[mat-button] {
  color: #1db954 !important;
  font-weight: 700 !important;
  border: 1px solid #1db954 !important;
  border-radius: 20px !important;
  padding: 4px 18px !important;
  transition: background-color 0.15s ease;
}

button[mat-button]:hover {
  background-color: rgba(29, 185, 84, 0.1) !important;
}
  `]
})
export class VinylModalComponent {
  constructor(
    public dialogRef: MatDialogRef<VinylModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message?: string; vinyl?: Vinyl }
  ) {}
}