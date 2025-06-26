import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PaginationBtnOption, PokemonPaginationComponent } from '../pokemon-pagination/pokemon-pagination.component';
import { PadStartPipe } from '../../shared/pipes/pad-start/pad-start.pipe';
import { TranslateTypePipe } from '../../pipes/translate-type/pokemon-type.pipe';
import { PokemonTypeDirective } from '../../directives/pokemon-type/pokemon-type.directive';
import { PokemonInfoComponent } from '../pokemon-info/pokemon-info.component';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, PokemonPaginationComponent, PadStartPipe, TranslateTypePipe, PokemonTypeDirective, PokemonInfoComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit, OnDestroy{
  pokemon!: Pokemon;
  previous?: Pokemon;
  next?: Pokemon;

  private subs = new Subscription();


  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('init pokemon-detail-page');

    const paramMap$ = this.activatedRoute.paramMap.subscribe(params =>{
      const pokeId = parseInt(params.get('id')!, 10);
      if (pokeId < 2) {
        this.previous = undefined;
      } else {
        this.getPrevious(pokeId - 1);
      }
      if (pokeId > 1009) {
        this.next = undefined;
      } else {
        this.getNext(pokeId + 1);
      }
      this.getPokemon(pokeId);
    });
    this.subs.add(paramMap$);
  }

  onClickPagination(opt: PaginationBtnOption): void{
    if(opt === 'next'){
      this.router.navigate(['pokemon', this.next?.id], {skipLocationChange:true});
    }else if (opt === 'prev'){
      this.router.navigate(['pokemon', this.previous?.id], {skipLocationChange:true});
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
    console.log('destroy pokemon-detail-page');

  }

  private getPrevious(id: number){
    this.pokemonService.getPokemonName(id).subscribe(p => this.previous = p);
  }

  private getNext(id: number){
    this.pokemonService.getPokemonName(id).subscribe(p => this.next = p);
  }

  private getPokemon(id: number){
    this.pokemonService.getPokemonFullInfo(id)
    .subscribe(p => this.pokemon = p)
  }
}
