import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemon/component/pokemon-detail/pokemon-detail.component';
import { PokemonPageComponent } from './pokemon/component/pokemon-page/pokemon-page.component';

export const routes: Routes = [
  { path: 'home', component: PokemonPageComponent, pathMatch: 'full' },
  {
    path: 'pokemon/:id', loadComponent: () => import("./pokemon/component/pokemon-detail/pokemon-detail.component")
    .then(mod => mod.PokemonDetailComponent)
  },

  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }
];
