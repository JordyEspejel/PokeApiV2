import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPokemonType]',
  standalone: true,
})
export class PokemonTypeDirective implements OnInit {
  @Input() appPokemonType!: string;

  @HostBinding('style.backgroundColor') bgColor: string = 'none';
  @HostBinding('style.color') color: string = '#fff';
  @HostBinding('style.padding') padding: string = '5px 10px';
  @HostBinding('style.borderRadius') borderRadius = '5px';

  private colors: any = {
    'Normal': '#A8A77A',
    'Fighting': '#C22E28',
    'Flying': '#A98FF3',
    'Poison': '#A33EA1',
    'Ground': '#E2BF65',
    'Rock': '#B6A136',
    'Bug': '#A6B91A',
    'Ghost': '#735797',
    'Steel': '#B7B7CE',
    'Fire': '#EE8130',
    'Water': '#6390F0',
    'Grass': '#7AC74C',
    'Electric': '#F7D02C',
    'Psychic': '#F95587',
    'Ice': '#96D9D6',
    'Dragon': '#6F35FC',
    'Dark': '#705746',
    'Fairy': '#D685AD',
    'Unknown': 'none',
    'Shadow': '#fff'
  }

  ngOnInit(): void {
    this.bgColor = this.colors[this.appPokemonType];
  }
}
