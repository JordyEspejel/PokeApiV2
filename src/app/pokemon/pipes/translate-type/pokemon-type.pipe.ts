import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateType',
  standalone: true,
})
export class TranslateTypePipe implements PipeTransform {
  private static readonly translations: any = {
    'Normal': 'Normal',
    'Fighting': 'Lucha',
    'Flying': 'Volador',
    'Poison': 'Veneno',
    'Ground': 'Tierra',
    'Rock': 'Roca',
    'Bug': 'Bicho',
    'Ghost': 'Fantasma',
    'Steel': 'Acero',
    'Fire': 'Fuego',
    'Water': 'Agua',
    'Grass': 'Planta',
    'Electric': 'Eléctrico',
    'Psychic': 'Psíquico',
    'Ice': 'Hielo',
    'Dragon': 'Dragón',
    'Dark': 'Siniestro',
    'Fairy': 'Hada',
    'Unknown': 'Desconocido',
    'Shadow': 'Sombra'
  }

  transform(value: string): string {
    return TranslateTypePipe.translations[value];
  }

}
