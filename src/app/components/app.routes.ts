import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from '../components/personas/personas.component';
import { CrearPersonaComponent } from '../components/crear-persona/crear-persona.component';
import { ModuleWithProviders } from '@angular/core';


export const ROUTES: Routes = [

    { path: 'listarPersonas', component: PersonasComponent},
    { path: 'listarPersonas/:mensaje', component: PersonasComponent},
    { path: 'crearPersona', component: CrearPersonaComponent},
    { path: 'crearPersona/:idPersona', component: CrearPersonaComponent},
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
]

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);