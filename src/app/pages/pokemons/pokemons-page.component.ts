import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

import PokemonListComponent from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemons-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (Number.isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  ngOnInit(): void {
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    const pageToLoad = (this.currentPage() ?? 1) + page;

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>                                                                  //para disparar el efecto secundario de cambiar la pagina
          this.router.navigate([], { queryParams: { page: pageToLoad } })         //funciona la paginacion
        ),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
