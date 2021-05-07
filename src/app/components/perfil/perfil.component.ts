import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  name = 'Ash';
  following = 50001;
  followers = 10002;

  strengths = [{ text: 'Lider del Gimnasio Ciudad Celeste', level: 'Medalla Cascada'}, { text: 'Pokemon tipo Agua', level: 'Nivel: 30'}, ]



  constructor() { }

  ngOnInit(): void {
  }

}
