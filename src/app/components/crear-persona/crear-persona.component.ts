import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/components/common/message';
import { PersonasService } from '../../services/personas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasModel } from '../../models/personas.model';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {

  form: FormGroup;
  msgs: Message[] = [];
  persona: PersonasModel;
  idPersona: string;
  estado: boolean;
  verActualizar = false;

  constructor(private fb: FormBuilder,
              private personaService: PersonasService,
              private router: ActivatedRoute,
              private routerNav: Router) {
    this.form = this.fb.group({
      id: [null],
      nombre: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)// solo letras
      ]],
      apellido: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)// solo letras
      ]],
      empresa: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)// solo letras
      ]],
      email: ['',
      [
        Validators.required,
      ]],
      edad: ['',
        [
          Validators.required,
          Validators.pattern(/^([0-9])*$/), // solo numeros
        ]],
      ip: ['',
        [
          Validators.required,
          Validators.pattern(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)
        ]]
    });
  }

  ngOnInit() {
    this.idPersona = this.router.snapshot.paramMap.get('idPersona');

    this.personaService.consultarUsuario(this.idPersona).subscribe(data =>{
      this.persona = data;

      this.form.get('nombre').setValue(this.persona.nombre);
      this.form.get('apellido').setValue(this.persona.apellido);
      this.form.get('empresa').setValue(this.persona.empresa);
      this.form.get('email').setValue(this.persona.email);
      this.form.get('edad').setValue(this.persona.edad);
      this.form.get('ip').setValue(this.persona.ip);

    });
  }

  guardar() {
    let mensaje = '';

    if (this.form.invalid) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Debes completar la informacion del formulario.' });

    } else {

     if (!this.persona) {
       this.persona = new PersonasModel();
     }

     this.persona.nombre = this.form.get('nombre').value;
     this.persona.apellido = this.form.get('apellido').value;
     this.persona.empresa = this.form.get('empresa').value;
     this.persona.email = this.form.get('email').value;
     this.persona.edad = this.form.get('edad').value;
     this.persona.ip = this.form.get('ip').value;

     if (this.idPersona) {

       this.personaService.actualizarUsuario(this.persona).subscribe(data => {

         this.form.reset();
         mensaje = 'Registro actualizado con éxito';
         this.routerNav.navigate(['/listarPersonas', mensaje]);

       });

     } else {
       this.personaService.guardarUsuario(this.persona).subscribe(data => {

         this.form.reset();
         mensaje = 'Registro almacenado con exito';
         this.routerNav.navigate(['/listarPersonas', mensaje]);
       });
     }
    }
  }

}
