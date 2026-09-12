export interface Vinyl {
  id?: number;
  name: string;
  genre: string;
  year: number | null;
  artist: string;
  conservation_state: string;
  photo_url?: string;
  created_datetime?: string;
}