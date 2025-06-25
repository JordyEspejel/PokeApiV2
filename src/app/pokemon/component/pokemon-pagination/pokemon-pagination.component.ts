import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PadStartPipe } from '../../shared/pipes/pad-start/pad-start.pipe';
import { Pokemon } from '../../models/pokemon.model';

export type PaginationBtnOption = 'prev' | 'next';

@Component({
  selector: 'app-pokemon-pagination',
  standalone: true,
  imports: [CommonModule, PadStartPipe],
  templateUrl: './pokemon-pagination.component.html',
  styleUrl: './pokemon-pagination.component.css'
})
export class PokemonPaginationComponent {
  @Input() previous?: Pokemon;
  @Input() next?: Pokemon;
  @Output() clickBtn = new EventEmitter();

  onClickBtn(option: PaginationBtnOption): void{
    this.clickBtn.emit(option);
  }
}
