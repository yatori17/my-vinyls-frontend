const GENRE_TRANSLATIONS: Record<string, string> = {
  'Rock': 'Rock',
  'Pop': 'Pop',
  'Electronic': 'Eletrônica',
  'Hip Hop': 'Hip Hop',
  'Jazz': 'Jazz',
  'Latin': 'Latino',
  'Folk, World, & Country': 'Folk / Regional',
  'Funk / Soul': 'Funk / Soul',
  'Classical': 'Clássica',
  'Reggae': 'Reggae',
  'Blues': 'Blues',
  'Stage & Screen': 'Trilha Sonora',
  'Non-Music': 'Outros',
  'Children\'s': 'Infantil',
};

export function translateGenre(genre: string): string {
  return GENRE_TRANSLATIONS[genre] ?? genre;
}