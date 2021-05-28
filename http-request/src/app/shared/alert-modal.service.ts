import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

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

  // O SERVIÇO ABAIXO VAI SER USADO PARA QUE POSSAMOS USAR UM COMPONENT
  // MODAL CRIADO COM BOOTSTRAP NAS NOSSAS MENSAGENS DE CONFIRMAÇÃO
  showConfirm(title: string, msg:string, okTxt?:string, cancelTxt?:string){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent)
          bsModalRef.content.title = title;
          bsModalRef.content.msg = msg;
          
          if(okTxt){
            bsModalRef.content.okTxt = okTxt
          }

          if(cancelTxt){
            bsModalRef.content.cancelTxt = cancelTxt
          }

          // PELO bsModalRef PODEMOS ACESSAR QUALQUER VARIAVEL PUBLICA NO NOSSO
          // CONFIRM COMPONENT INVOCADO NESTE SERVIÇO. ENTÃO VAMOS ACESSAR
          // E RETORNAR O NOSSO SUBJECT CRIADO QUE ENVIA O TRUE OU FALSE
          // SE FIZERMOS APENAS return bsModalRef.content.confirmResult
          // O SERVICE VAI FUNCIONAR. MAS PARA QUE NO ACESSO AO SERVIÇO O INTELISENTE
          // IDENTIFIQUE QUE ESTAMOS ENVIANDO UM SUBJECT, PODEMOS FAZER UM CASTING DO TIPO DE DADO
          // RETORNANDO USANDO UM OPERADOR DIAMOND CONTENDO O TIPO DE INFO QUE ESTAMOS SRETORNANDO        

          return (<ConfirmModalComponent>bsModalRef.content).confirmResult
  }
}
