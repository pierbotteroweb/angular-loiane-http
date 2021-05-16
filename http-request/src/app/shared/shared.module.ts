import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';



@NgModule({
  declarations: [
    AlertModalComponent
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
  // MAS SIM EM TEMPO DE EXECUÇÃO
  entryComponents:[
    AlertModalComponent
  ]
})
export class SharedModule { }
