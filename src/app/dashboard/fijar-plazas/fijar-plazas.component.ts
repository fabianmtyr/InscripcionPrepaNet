import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fijar-plazas',
  templateUrl: './fijar-plazas.component.html',
  styleUrls: ['./fijar-plazas.component.css']
})
export class FijarPlazasComponent implements OnInit {

  model = new Plaza();

  constructor() { }

  ngOnInit() {
  }

}
