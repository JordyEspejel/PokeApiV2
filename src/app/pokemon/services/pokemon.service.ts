import { join } from 'node:path';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  API_URL = 'https://pokeapi.co/api/v2';
  POKEMON_FRAGMENT = '/pokemon';
  TYPE_FRAGMENT ='/type';
  POKEMON_URL = this.API_URL + this.POKEMON_FRAGMENT;
  TYPE_URL = this.API_URL + this.TYPE_FRAGMENT;

  url = this.POKEMON_URL + '/?ofsset={{offset}}&limit=9';

  constructor(private readonly http: HttpClient) { }

  getAllPokemon(offset: number):Observable<any>{
    return this.http.get<any>(this.url.replace('{{offset}}',offset.toString()))
    .pipe(
      mergeMap(res => res.results),
      mergeMap((a: any) => this.http.get(a.url))
      );
  }

  getPokemonName(id: number):Observable<Pokemon>{
    return this.http.get<any>(`${this.POKEMON_URL}/${id}`)
    .pipe(map( a =>({
      id: a.id,
      name: a.name,
      imageUrl: '',
      types: []
    })));
  }

  getPokemonFullInfo(id: number):Observable<any>{
    return this.http.get<any>(`${this.POKEMON_URL}/${id}`)
    .pipe(
      mergeMap((poke : any) =>{
        const species$ = this.http.get<any>(poke.species.url).pipe(
          map((species) =>({
            description: species.flavor_text_entries.find((entry: any) => entry.language.name === 'es').flavor_text,
            category: species.genera.find((entry: any) => entry.language.name == 'es').genus,
            name: species.names.find((entry: any) => entry.language.name == 'es').name
          }))
        );
        const ability$ = this.http.get<any>(poke.abilities.find((entry: any) => entry.is_hidden === false).ability.url).pipe(
          map((ability) => ({
            ability: ability.names.find((entry: any) => entry.language.name == 'es').name
          }))
        );
        const weakness$ = this.getPokemonWeaknes(poke.types.map((t: any) => t.type.name))
        .pipe(map((res: any[]) =>({
          weakness: res.filter((w: any) => w.miltipier >1)
          .map((t: any) => t.type.split(" ").map((l: string) => l[0].toUpperCase() + l.substring(1)).join(" "))
        })
      ));

      return forkJoin([
        of({
          id: poke.id,
          types: poke.types.map((t: any) => t.type.name.split('').map((l : string) => l[0].toUpperCase() + l.substring(1)).join(" ")),
          imageUrl: poke.sprites.other('official-artwork').front_default,
          heigth: poke.height,
          weight: poke.weight
        }),
        species$,
        ability$,
        weakness$
      ])
      }),
      map(([PokemonInfo, descriptionInfo,abilityInfo,weakness]) =>({
        ...PokemonInfo,
        ...descriptionInfo,
        ...abilityInfo,
        ...weakness
      } as Pokemon))
    );
  }
  getPokemonWeaknes(types: string[]):Observable<any>{
    const urls = types
    .map(t => this. http.get<any>(`${this.TYPE_URL}/${t.toLocaleLowerCase()}`));
    return forkJoin(urls).pipe(
      map(res =>{
        const weakness: any[] = [];
        for(const poketype of res){
          for(const doubleDamageFrom of poketype.damage_relations.damage_from){
            const existingWeaness = weakness.find(
              (weakness) => weakness.type == doubleDamageFrom.name
            );
            if (existingWeaness){
              existingWeaness.multiplier *=2;
            }else{
              weakness.push({
                type: doubleDamageFrom.name,
                multiplier: 2,
              });
            }
          }

          for (const halfDamageFrom of poketype.damage_relations.half_damage_from){
            const existingWeakness = weakness.find(
              (weakness) => weakness.type === halfDamageFrom.name
            );
            if (existingWeakness){
              existingWeakness.multiplieer *= 0.5;
            }else{
              weakness.push({
                type: halfDamageFrom.name,
                multiplier: 0.5
              });
            }
          }

          for (const noDamageFrom of poketype.damage_relations.no_damage_from){
            const existingWeakness = weakness.find(
              (weakness) => weakness.type === noDamageFrom.name
            );
            if (existingWeakness){
              existingWeakness.multiplier = 0;
            }else{
              weakness.push({
                type: noDamageFrom.name,
                multiplier: 0
              });
            }
          }

        }
        return weakness;
      })
    )

  }

}
