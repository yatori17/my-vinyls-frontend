import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { VinylService } from '../../services/vinyl.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Vinyl } from '../../models/vinyl.model';
import { translateGenre } from '../shared/genre-translator';


@Component({
  selector: 'app-vinyl-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule],
  templateUrl: './vinyl-form.component.html',
  styleUrl: './vinyl-form.component.css',
})
export class VinylFormComponent {
  @ViewChild(MatAutocompleteTrigger) autoTrigger!: MatAutocompleteTrigger;
  vinylData: Vinyl;
  isEditing: boolean;
  externalResults: any[] = [];
  private searchTimeout: any;
  private nameQuery$ = new Subject<string>();
  errorMessage: string = '';


  constructor(
    public dialogRef: MatDialogRef<VinylFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vinylData: Vinyl; isEditing: boolean },
    private vinylService: VinylService
  ) {
    this.vinylData = { ...data.vinylData };
    this.isEditing = data.isEditing;
  }

  searchErrorMessage: string = ''; // novo

  ngOnInit(): void {
    this.nameQuery$.pipe(
      filter(q => q.length >= 4),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(q => this.vinylService.searchExternalVinyl(q))
    ).subscribe({
      next: (res: any) => {
        this.externalResults = res.results || [];
        this.searchErrorMessage = '';
        if (this.externalResults.length > 0) {
          this.autoTrigger.openPanel();
        }
      },
      error: (err: any) => {
        console.error('Erro ao buscar no Discogs:', err);
        this.searchErrorMessage = 'Busca automática indisponível no momento. Preencha manualmente.';
        this.externalResults = [];
      }
    });
  }

  onNameChange(query: string): void {
    this.searchErrorMessage = ''; // limpa ao digitar de novo
    if (!query) {
      this.externalResults = [];
      return;
    }
    this.nameQuery$.next(query);
  }
  
  onSelectDiscogsItem(item: any): void {
    const parts = item.title.split(' - ');
    if (parts.length > 1) {
      this.vinylData.artist = parts[0].trim();
      this.vinylData.name = parts.slice(1).join(' - ').trim();
    } else {
      this.vinylData.name = item.title.trim();
    }
    if (item.year) {
      this.vinylData.year = item.year;
    }
    if (item.cover_image || item.thumb) {
      this.vinylData.photo_url = item.cover_image || item.thumb;
    }
    if (item.genre) {
      this.vinylData.genre = translateGenre(item.genre[0]);
    }

    this.externalResults = [];
  }

  onSubmit(): void {
    const missing: string[] = [];

    if (!this.vinylData.name) missing.push('Título do Álbum');
    if (!this.vinylData.artist) missing.push('Artista');
    if (!this.vinylData.year) missing.push('Ano');
    if (!this.vinylData.conservation_state) missing.push('Estado de Conservação');

    if (missing.length > 0) {
      this.errorMessage = `Preencha os campos obrigatórios: ${missing.join(', ')}.`;
      return;
    }

    this.errorMessage = '';
    this.dialogRef.close(this.vinylData);
  }

  displayFn = (item: any): string => {
    if (!item) return '';
    return typeof item === 'string' ? item : item.title;
  };
}