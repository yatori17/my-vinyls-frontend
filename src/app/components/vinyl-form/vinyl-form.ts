import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Vinyl, VinylService } from '../../services/vinyl.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';


@Component({
  selector: 'app-vinyl-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, 
    MatInputModule, 
    MatAutocompleteModule],
  templateUrl: './vinyl-form.html',
  styleUrl: './vinyl-form.css',
})
export class VinylFormComponent {
  vinylData: Vinyl;
  isEditing: boolean;
  externalResults: any[] = [];
  private searchTimeout: any;
  private nameQuery$ = new Subject<string>();


  constructor(
    public dialogRef: MatDialogRef<VinylFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vinylData: Vinyl; isEditing: boolean },
    private vinylService: VinylService 
  ) {
    this.vinylData = { ...data.vinylData };
    this.isEditing = data.isEditing;
  }

  ngOnInit(): void {
  this.nameQuery$.pipe(
    filter(q => q.length >= 4),
    debounceTime(600),
    distinctUntilChanged(),
    switchMap(q => this.vinylService.searchExternalVinyl(q))
  ).subscribe({
    next: (res: any) => this.externalResults = res.results || [],
    error: (err: any) => console.error('Erro ao buscar no Discogs:', err)
  });
}

  onNameChange(query: string): void {
  if (!query) {
    this.externalResults = [];
    return;
  }
  this.nameQuery$.next(query);
}
  onSelectDiscogsItem(item: any): void {
    this.vinylData.name = item.title;
    if (item.year) {
      this.vinylData.year = item.year;
    }
    
    this.externalResults = [];
  }

  onSubmit(): void {
    if (!this.vinylData.name || !this.vinylData.artist) {
      alert('Preencha o nome e o artista!');
      return;
    }
    this.dialogRef.close(this.vinylData);
  }

  displayFn = (item: any): string => {
  if (!item) return '';
  return typeof item === 'string' ? item : item.title;
};
}