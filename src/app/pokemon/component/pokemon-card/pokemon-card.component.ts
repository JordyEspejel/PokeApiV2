import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonTypeDirective } from '../../directives/pokemon-type/pokemon-type.directive';
import { PadStartPipe } from '../../shared/pipes/pad-start/pad-start.pipe';
import {TranslateTypePipe} from '../../pipes/translate-type/pokemon-type.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [PokemonTypeDirective, PadStartPipe, TranslateTypePipe, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon = {} as Pokemon;
  @Output() clickImage = new EventEmitter<Pokemon>();

  onClickPokemonImage(): void{
    this.clickImage.emit(this.pokemon);
  }

}
