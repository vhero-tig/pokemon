//import { SignPrivateKeyInput } from "crypto";

export class PokemonDetail {
  id: number;
  order: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  spices: Species[];
  types: Type[];
  sprites: Sprite;
  stats: Stat[];

  constructor() {
    this.abilities = [];
    this.types = [];
  }
}

class Ability {
  ability: {
    name: string
  }
  constructor() {

  }
}

class Species {
  url: string;
}

class Type {
  slot: number;
  type: {
    name: string;
  }
}

class Sprite {
  front_default: string;
}


class Stat {
  base_stat: number;
  stat: {
    name: string;
  }
}










