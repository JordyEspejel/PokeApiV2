import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { toArray } from 'rxjs';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css'
})
export class PokemonPageComponent {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService,
    private router: Router
  ){}

  onCLickPokemonImage(pokemon: Pokemon): void{
    this.router.navigate(['pokemon',pokemon.id]);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('init pokemon-page');
    this.pokemonService.getAllPokemon(0)
    .pipe(toArray())
    .subscribe((p: any[]) =>{
      this.pokemons = p.map(poke => ({
          id: poke.id,
          name: poke.name,
          types: poke.types.map((t: any) => t.type.name.split(" ").map((l: string) => l[0].toUpperCase() + l.substring(1)).join(" ")),
          imageUrl: poke.sprites.other['official-artwork'].front_default
      })).sort((a,b) => a.id - b.id)
    });
  }
}
