import { inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '../types/pokemon';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Service for managing and retrieving Pokémon data from the API.
 *
 * @remarks
 * This service provides a reactive signal with the list of Pokémon, loaded from a static JSON API.
 * It is provided in the root injector, so it is a singleton throughout the app.
 */
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  /**
   * Angular HttpClient instance for making HTTP requests.
   * @internal
   */
  private readonly http: HttpClient = inject(HttpClient);

  /**
   * The URL to the Pokémon API JSON file.
   * @internal
   */
  protected readonly apiUrl: string = '/pokemon-api.json';

  /**
   * Reactive signal containing the list of Pokémon loaded from the API.
   *
   * @example
   * this.pokemonService.pokemonList(); // returns Pokemon[]
   */
  readonly pokemonList = toSignal(this.http.get<Pokemon[]>(this.apiUrl), {
    initialValue: [],
  });

  // /**
  //  * Loads Pokémon data from the API and updates the signal.
  //  *
  //  * @deprecated Use the reactive signal `pokemonList` instead.
  //  */
  // async loadPokemons(): Promise<void> {
  //   const res = await fetch(this.apiUrl);
  //   if (!res.ok) {
  //     throw new Error(`Failed to fetch types: ${res.status} ${res.statusText}`);
  //   }
  //   const data: Pokemon[] = await res.json();
  //   this.pokemonList.set(data);
  // }
}
