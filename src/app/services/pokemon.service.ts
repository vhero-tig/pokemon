import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokemonDetail } from '../../models/pokemondetail';
import { PokemonList } from '../../models/pokemonlist';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getPokemonList(offset: number, limit: number = 20): 
    Observable<PokemonList[]> {
      return this.http.get<PokemonList[]>(this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit)
    .pipe(
      map((x: any) => x.results)
    ); 
    console.log("print pokemon list", offset); 
  }

  getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
    console.log("print service detail", pokemon);
  }

}


