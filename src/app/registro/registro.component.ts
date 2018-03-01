import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../services/registro.service';
import { Candidato } from '../models/candidato.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

userModel = new Candidato;

  constructor(private router:Router, private registro:RegistroService) { }

  ngOnInit() {
  }

}
