import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'upload'
  },
  {
    path: 'cursos',
    // loadChildren: './cursos/cursos.module#CursosModule'  vvvvvv==forma atualizada de chamada de modulos lazy loading 
    loadChildren: () => import('./cursos/cursos.module').then(m=>m.CursosModule)
  },
  {
    path: 'upload',
    // loadChildren: './upload-file/upload-file.module#UploadFileModule' vvvvvv==forma atualizada de chamada de modulos lazy loading
    loadChildren: () => import('./upload-file/upload-file.module').then(m=>m.UploadFileModule)
  },
  {
    path: 'rxjs-poc',
    // loadChildren: './unsubscribe-rxjs/unsubscribe-rxjs.module#UnsubscribeRxjsModule' vvvvvv==forma atualizada de chamada de modulos lazy loading
    loadChildren: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(m=>m.UnsubscribeRxjsModule)
  },
  {
    path: 'busca-reativa',
    loadChildren: () => import('./reactive-search/reactive-search.module').then(m=>m.ReactiveSearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
