import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

// ENUM PARA TIPOFICAR OS TIPOS DE ALERTA

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }


  private showAlert(message: string, type:AlertTypes, dismissTimeout?: number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent)
          bsModalRef.content.type = type;
          bsModalRef.content.message = message  

          // ABAIXO UM SETTIMEOUT PARA FECHAR O MODAL AUTOMATICAMENTE
          // APÓS TEMPO DEFINIDO POR PARAMETRO E EXECUTANDO O METODO HIDE
          // DO NGX-BOOTSTRAP/MODAL
          
          if(dismissTimeout){
            setTimeout(()=>bsModalRef.hide(),dismissTimeout)
          }
  }

  showAlertDanger(message:string){
    // const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent)
    //       bsModalRef.content.type = 'danger';
    //       bsModalRef.content.message = message

    // EM VEZ DE REPETIR O CODIGO ACIMA, USAMOS O METODO PRIVADO CRIADO
    this.showAlert(message,AlertTypes.DANGER)

  }

  // PODEMOS CRIAR UM NOVO METODO PARA EXIBIR UM ALERTA DE SUCESSO
  // MAS COMO ESTARIAMOS REPETINDO CODIGO, PODEMOS CRIAR UM METODO PRIVADO
  // GENERICO

  showAlertSuccess(message:string){
    // const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent)
    //       bsModalRef.content.type = 'success';
    //       bsModalRef.content.message = message

    // EM VEZ DE REPETIR O CODIGO ACIMA, USAMOS O METODO PRIVADO CRIADO
    this.showAlert(message,AlertTypes.SUCCESS,3000)

  }
}
