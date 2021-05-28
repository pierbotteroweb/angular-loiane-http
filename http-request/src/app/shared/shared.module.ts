import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertModalComponent
  ],
  // AQUI PRECISAMOS ADICIONAR O ALERTMODALCOMPONENT 
  // NO ENTRYCOMPONENTS DO MODULO,
  // POIS ELE NÃO SERÁ INSTANCIADO COMO UM COMPONENTE QUALQUER NO TEMPLATE,
  // MAS SIM EM TEMPO DE EXECUÇÃO. NÃO É UM COMPONENT QUE A GENTE INSERE
  // NO TEMPLATE USANDO AQUELA REF NO DECORATOR. O COMPONENT É USADO
  // POR UMS SERVIÇO QUE RENDERIZA EM TEMPO REAL O COMPONENT 
  entryComponents:[
    AlertModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
