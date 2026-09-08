import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vinyl } from '../models/vinyl.model';

@Injectable({
  providedIn: 'root'
})
export class VinylService {
  private apiUrl = 'http://localhost:5000'; // Endereço do seu Flask

  constructor(private http: HttpClient) {}

  getVinyls(): Observable<{ vinyls: Vinyl[] }> {
    return this.http.get<{ vinyls: Vinyl[] }>(`${this.apiUrl}/vinyls`);
  }

  addVinyl(vinyl: Vinyl): Observable<Vinyl> {
    return this.http.post<Vinyl>(`${this.apiUrl}/vinyl`, vinyl);
  }

  deleteVinyl(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vinyl/${id}`);
  }

  updateVinyl(id: number, vinyl: Vinyl): Observable<any> {
  return this.http.put(`${this.apiUrl}/vinyl/${id}`, vinyl);
}

searchExternalVinyl(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/external-vinyl?query=${query}`);
  }
}