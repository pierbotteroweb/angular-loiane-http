import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces:true
})
export class CursosListaComponent implements OnInit {

  cursos: Curso[];
  cursos$: Observable<Curso[]>;

  constructor(private service: CursosService) { }

  ngOnInit() {
    // EM VEZ DE USAR O SUBSCRIBE COMO ABAIXO
    // FAZENDO COM QUE EXISTA A NECESSIDADE DE UM UNSUBSCRIBE,
    // PODEMOS ATRIBUIR O RETURN DA NOSSA REQUEST A UMA VARIAVEL
    // DO TIPO OBSERVABLE: 

        // this.service.list()
        // .subscribe(dados => this.cursos = dados)
        
    this.cursos$ = this.service.list();

    // NESSE CASO, SERÁ NECESSÁRIO TAMBÉM ALTERAR O TEMPLATE
    // USANDO A VAR OBSERVABLE E UM PIPE ASYNC
  }

}
