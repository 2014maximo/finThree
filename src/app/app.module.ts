import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//FORMULARIOS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//NG PRIME
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleriaModule } from 'primeng/galleria';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

//INTERCEPTOR
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//COMPONENTES
import { CrearPersonaComponent } from './components/crear-persona/crear-persona.component';
import { PersonasComponent } from './components/personas/personas.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

//RUTAS
import { RouterModule } from '@angular/router';
import { ROUTES } from './components/app.routes';

@NgModule({
  declarations: [
    AppComponent,
    CrearPersonaComponent,
    PersonasComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    GalleriaModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    RouterModule.forRoot( ROUTES)
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
