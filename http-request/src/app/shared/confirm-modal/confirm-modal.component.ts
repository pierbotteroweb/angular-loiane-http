import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title:string
  @Input() msg:string
  @Input() cancelTxt = "Cancelar"
  @Input() okTxt = 'Sim'

  // O COMPONENT PRECISA EMITIR VALORES. SE FOSSE UM COMPONENT INSTANCIAVEL
  // PODERIAMOS USAR UM OUTPUT. MAS COMO É UM COMPONENT EXECUTAOD EM TEMPO REAL PELO SERVICE CRIADO
  // PODEMOS USAR UM OBSERVABLE TO TIPO SUBJECT PARA EMISSÃO DE VALORES
  confirmResult: Subject<boolean>;


  constructor(public bsModalRef: BsModalRef ) { }

  ngOnInit() {
    this.confirmResult = new Subject()
  }

  onConfirm(){
    //AQUI EMITIMOS O VALOR DE TRUE ASSIM QUE
    // CLICAMOS EM CONFIRMAR NO MODAL
    this.confirmAndclose(true)
  }

  onClose(){
    //AQUI EMITIMOS O VALOR DE FALSE ASSIM QUE
    // CLICAMOS EM CONFIRMAR NO MODAL
    this.confirmAndclose(false)
  }

  // ESSE METODO NUNCA SERÁ CHAMADO DIRETAMENTE PELO TEMPLATE.
  // POR ISSO PODEMOS SETAR ELE COMO PRIVATE
  private confirmAndclose(value: boolean){
    this.confirmResult.next(value)
    this.bsModalRef.hide()
  }

}
