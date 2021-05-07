import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,  } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonDetail } from '../../../models/pokemondetail';
import { PokemonList } from '../../../models/pokemonlist';
import { PokemonService } from 'src/app/services/pokemon.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSlideToggle} from '@angular/material/slide-toggle';


import { Pokemon } from 'src/shared/intefaces/pokemon.interface';
import { forkJoin, Observable } from 'rxjs';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.sass']
})
export class CatalogoComponent implements OnInit {

  search: FormControl = new FormControl('');
  pokemons: PokemonDetail[] = [];
  classicMode: boolean = true;

  private offset: number;
  isLoading: boolean;
  isLastPage = false;

  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;

  constructor( private _pokeService: PokemonService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private router: Router
     ) {
       this.offset = 0;    
      }

    ngOnInit(): void{
      this.getPage(this.offset)
      console.log("print page", this.getPage);
   }

  getPage(offset: number) {
    if(!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this._pokeService.getPokemonList(offset)
        .subscribe((list: PokemonList[]) => {
          console.log("print pokemonlist", list);
          if(list.length === 0) {
            this.isLastPage = true;
        }

        if(!this.isLastPage) {
          this.getPokemon(list);
        }
      })
    }
  }

  onSearchPokemon(): void{
    const value = this.search.value;
    if(value === '') {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this._pokeService.getPokemonDetail(value).subscribe(
        (pokemon: PokemonDetail) => {
          this.searchPokemon = pokemon;
          this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if(error.status === 404) {
          this.snackBar.open('Pokemon  no encontrado', 'Ok',{
            duration: 5000,
          });
        }
      });
    }
  }


onScroll(event: Event): void {
  const element: HTMLDivElement = event.target as HTMLDivElement;
  if(element.scrollHeight - element.scrollTop < 1000) {
    this.getPage(this.offset);
  }
}

private getPokemon(list: PokemonList[]) {
  const arr: Observable<PokemonDetail>[] = [];
  list.map((value: PokemonList) => {
    arr.push(
      this._pokeService.getPokemonDetail(value.name)
    );
    console.log("print page", value);
  });

  forkJoin([...arr]).subscribe((pokemons:  []) => {
    this.pokemons.push(...pokemons);
    this.offset += 20;
    this.isLoading = false;
  })
}

getPrincipalType(list: any[]) {
  return list.filter(x => x.slot === 1)[0]?.type.name;
}

onDetail(pokemon: PokemonDetail): void {
 this.bottomSheet.open(DetalleComponent, {
    data: {pokemon, classicMode: this.classicMode}
  }) 
  console.log("print detail", pokemon);
}


}































 