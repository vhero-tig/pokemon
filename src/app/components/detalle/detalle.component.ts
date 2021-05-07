import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { PokemonDetail } from '../../../models/pokemondetail';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.sass']
})
export class DetalleComponent implements OnInit {

 
  //creamos una variable para los datos
  pokemon: PokemonDetail;
  classicMode: boolean;

  /*pokemonType = [];
  pokemonImg = '';
  statics: any[] = []; */

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, 
    private bottomSheet: MatBottomSheet
   ) { 
   this.pokemon = data.pokemon;
   this.classicMode = data.classicMode;
  }

  ngOnInit(): void {
    
  }

  getAbilities(): string {
    return this.pokemon.abilities.map(x => x.ability.name).join(', ');
  }

  getPrincipalType(list: any[]) {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }

  home() {
    this.bottomSheet.dismiss();
  } 

  
 

 /* getPokemon(pokemon){
    this._pokeService.getPokemonDetail(pokemon).subscribe(
      res => {
        console.warn("res", res)
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        //this.pokemonType = res.types[0].type.name;
        this.statics = res.stats;
        console.warn("estadisticas", res.stats)
      },
      err => {

      }
    )
  }

  */

 

}




