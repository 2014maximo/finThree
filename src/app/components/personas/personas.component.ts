import { Component, OnInit } from '@angular/core';
import { PersonasModel } from '../../models/personas.model';
import { Message, ConfirmationService } from 'primeng/api';
import { PersonasService } from '../../services/personas.service';
import { ActivatedRoute, Routes } from '@angular/router';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  personas: PersonasModel[];
  msgs: Message[] = [];

  constructor(private personasService: PersonasService,
              private confirmationService: ConfirmationService,
              private router: ActivatedRoute) {

               }

  ngOnInit() {
    this.consultarPersonas();

    const mensaje = this.router.snapshot.paramMap.get('mensaje');
    this.msgs = [];
    if (mensaje){
      this.msgs.push({
        severity: 'success',
        summary: 'Informacion',
        detail: mensaje
      })
    }
  }

  consultarPersonas() {
    this.personasService.consultaPersonas().subscribe((datos: PersonasModel[]) => {
      this.personas = datos;
    });
  }

  confirmarEliminar(idEliminar: string, idnombre: string) {
    console.log(idEliminar);
    this.confirmationService.confirm({
      message: `Esta seguro de eliminar a ${idnombre}?` ,
      accept: () => {

        this.personasService.eliminarUsuario(idEliminar).subscribe(data => {
          this.msgs = [];
          this.msgs.push({
            severity: 'success',
            summary: 'Informacion',
            detail: 'Registro eliminado con exito.'
          });

          this.consultarUsuarios();

        });

      }
    });
  }
  consultarUsuarios() {
    this.personasService.consultaPersonas().subscribe(datos => {
      this.personas = datos;
    });
  }

}
