import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { VinylFormComponent } from './components/vinyl-form/vinyl-form';
import { VinylListComponent } from './components/vinyl-list/vinyl-list';
import { VinylService, Vinyl } from './services/vinyl.service';
import { MatDialog } from '@angular/material/dialog';
import { VinylModalComponent } from '../app/components/vinyl-modal/vinyl-modal';
import { ConfirmDialogComponent } from '../app/components/confirm-dialog-data/confirm-dialog-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VinylListComponent, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  vinyls = signal<Vinyl[]>([]);
  isEditing: boolean = false;
  isLoading = signal<boolean>(true);

  currentVinyl: Vinyl = this.getEmptyVinyl();
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor(private vinylService: VinylService) { }
  ngOnInit(): void {
    this.loadVinyls();
  }

  getEmptyVinyl(): Vinyl {
    return {
      name: '',
      artist: '',
      year: 2024,
      genre: 'Rock',
      conservation_state: 'Excelente (NM)'
    };
  }

  loadVinyls(): void {
    this.isLoading.set(true);
    this.vinylService.getVinyls().subscribe({
      next: (data) => {
        this.vinyls.set(data.vinyls || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar vinis:', err);
        this.isLoading.set(false);
      }
    });
  }

  editVinyl(vinyl: Vinyl): void {
    this.currentVinyl = { ...vinyl }; // clona pra não editar direto na lista
    this.isEditing = true;
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['snack-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      panelClass: ['snack-error'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  handleSave(vinyl: Vinyl): void {
    if (this.isEditing && vinyl.id) {
      this.vinylService.updateVinyl(vinyl.id, vinyl).subscribe({
        next: () => {
          this.loadVinyls();
          this.currentVinyl = this.getEmptyVinyl();
          this.isEditing = false;
          this.showSuccess('Disco atualizado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao atualizar vinil:', err);
          this.showError('Não foi possível atualizar o disco.');
        }
      });
    } else {
      this.vinylService.addVinyl(vinyl).subscribe({
        next: () => {
          this.loadVinyls();
          this.currentVinyl = this.getEmptyVinyl();
          this.isEditing = false;
          this.showSuccess('Disco adicionado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao salvar vinil:', err);
          this.showError('Não foi possível adicionar o disco.');
        }
      });
    }
  }

  openAddModal(): void {
    this.currentVinyl = this.getEmptyVinyl();
    this.isEditing = false;
    this.openFormDialog();
  }

  openEditModal(vinyl: Vinyl): void {
    this.currentVinyl = { ...vinyl };
    this.isEditing = true;
    this.openFormDialog();
  }

  private openFormDialog(): void {
    const dialogRef = this.dialog.open(VinylFormComponent, {
      width: '500px',
      panelClass: 'dark-dialog',
      data: { vinylData: this.currentVinyl, isEditing: this.isEditing }
    });

    dialogRef.afterClosed().subscribe((result: Vinyl | undefined) => {
      if (result) {
        this.handleSave(result);
      }
    });
  }

  deleteVinyl(id?: number): void {
    if (!id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      panelClass: 'dark-dialog',
      data: {
        title: 'Remover disco',
        message: 'Tem certeza que deseja remover este disco da estante?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.vinylService.deleteVinyl(id).subscribe({
          next: () => {
            this.loadVinyls();
            this.showSuccess('Disco removido com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao deletar vinil:', err);
            this.showError('Não foi possível remover o disco.');
          }
        });
      }
    });
  }

  showDetails(vinyl: Vinyl) {
    this.dialog.open(VinylModalComponent, {
      width: '450px',
      data: { title: 'Detalhes do Vinil', vinyl }
    });
  }
}