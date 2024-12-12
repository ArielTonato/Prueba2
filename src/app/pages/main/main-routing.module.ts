import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'calificaciones',
        loadChildren: () => import('./calificaciones/calificaciones.module').then( m => m.CalificacionesPageModule)
      },
      {
        path: 'tareas',
        loadChildren: () => import('./tareas/tareas.module').then( m => m.TareasPageModule)
      }
    ]
  }


  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
