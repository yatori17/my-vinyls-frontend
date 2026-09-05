import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VinylService, Vinyl } from '../../services/vinyl';

@Component({
  selector: 'app-vinyl-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vinyl-list.html',
  styleUrls: ['./vinyl-list.css']
})
export class VinylListComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() vinyls: Vinyl[] = [];
  @Output() delete = new EventEmitter<number>();
@Output() details = new EventEmitter<Vinyl>();
@Output() edit = new EventEmitter<Vinyl>();

  searchTerm: string = '';

  get filteredVinyls(): Vinyl[] {
    if (!this.searchTerm) return this.vinyls;
    const term = this.searchTerm.toLowerCase();
    return this.vinyls.filter(v => 
      v.name.toLowerCase().includes(term) || 
      v.artist.toLowerCase().includes(term) ||
      v.genre.toLowerCase().includes(term)
    );
  }

  getStateClass(state: string): string {
    if (state.includes('Novo') || state.includes('M')) return 'novo';
    if (state.includes('Excelente') || state.includes('NM')) return 'excelente';
    return 'bom';
  }

  viewDetails(vinyl: Vinyl): void {
    this.details.emit(vinyl);
  }
}