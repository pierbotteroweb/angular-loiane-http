import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces:true
})
export class CursosListaComponent implements OnInit {




  // bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', {static: false}) deleteModal;


  cursos: Curso[];
  cursos$: Observable<Curso[]>;

  cursoSelecionado:Curso

  // A VAR ERROR É UM SUBJECT,
  // POIS ALÉM DE SER UM OBSERVABLE,
  // TAMBÉM É UM OBSERVER QUE PODE SER USANDO
  // COMO UM EMMITER. 
  // AQUI NO CASO ELE VAI EMITIR O VALOR TRUE QDO HOUVER ERRO DE REQUEST
  // E O OBSERVER NO TEMPLATE RECEBE O TRUE 

  error$ = new Subject<boolean>();

  constructor(private service: CursosService,
              private modalService: BsModalService,
              private alertService: AlertModalService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    // EM VEZ DE USAR O SUBSCRIBE COMO ABAIXO
    // FAZENDO COM QUE EXISTA A NECESSIDADE DE UM UNSUBSCRIBE,
    // PODEMOS ATRIBUIR O RETURN DA NOSSA REQUEST A UMA VARIAVEL
    // DO TIPO OBSERVABLE: 

        // this.service.list()
        // .subscribe(dados => this.cursos = dados)
        
    // this.cursos$ = this.service.list()
    // .pipe(
    //   catchError(err=>{
    //     console.error(err);
    //     this.error$.next(true);
    //     return empty()
    //   })
    // );
    this.onRefresh();

    // NESSE CASO, SERÁ NECESSÁRIO TAMBÉM ALTERAR O TEMPLATE
    // USANDO A VAR OBSERVABLE E UM PIPE ASYNC


  }

  onRefresh(){ 
    this.cursos$ = this.service.list()
    .pipe(
      catchError(err=>{
        console.error(err);
        // this.error$.next(true);
        this.handleError();
        return empty()
      })
    );
  }

  handleError(){
    // REUTILIZAR ESSE CODIGO ATRAVES DE UM SERVICE
    // NO CASO, NO SERVICO CRIADO ALERT-MODAL.SERVICE

      // this.bsModalRef = this.modalService.show(AlertModalComponent)
      // this.bsModalRef.content.type = 'danger';
      // this.bsModalRef.content.message = ' Erro ao carregar cursos. Tente novamente mais tarde.'
    
      this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
  }

  onEdit(id){
    // AQUI USAMOS O RELATIVETO (ACTIVATEROUTE)
    //  PARA QUE O REDIRECT FUNCIONE CORRETAMENTE
    this.router.navigate(['editar',id], {relativeTo: this.route})
  }

  onDelete(curso){
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success=> {
        this.onRefresh()
        this.deleteModalRef.hide()
      },
      error=> {
        this.alertService.showAlertDanger('Erro ao deletar o curso. Tente mais tarde.')
        this.deleteModalRef.hide()
      }
    )
    
  }

  onDeclineDelete(){
    this.deleteModalRef.hide()
  }

}