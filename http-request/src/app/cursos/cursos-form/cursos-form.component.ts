import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submited:boolean=false

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) {
          this.form = this.fb.group({
          id: [null],
          nome: [null,[Validators.required,
            Validators.minLength(3),Validators.maxLength(250)]]
        }) }

  ngOnInit() {

    // this.route.params
    // .pipe(
    //   map((params:any)=>params['id'])      
    // ).subscribe(
    //   (id)=>{
    //     console.log(id);
    //     const curso$ = this.service.loadById(id);
    //     curso$.subscribe(curso=>{
    //       this.updateform(curso);

    //     })
    //   }
    // )

    // ABAIXO UMA VERSÃO MAIS ELEGANTE E MENOS VERBOSA
    // DO CODIGO COMENTADO ACIMA, USANDO RECURSOS DE OPERADORES
    // DE OBSERVABLES

    this.route.params.pipe(
      map((params:any)=>params['id']),
      switchMap(id=>this.service.loadById(id))
    ).subscribe(curso=>this.updateform(curso))

    // COMO ESTAMOS FAZENDO USO DO OBSERVABLE ROUTE.PARAMS,
    // NÃO É NECESSÁRIO VAZER O UNSUBSCRIBE DOS SUBSCRIBES LISTADOS,
    // POIS COM A MUDANÇA DE ROTA, O UNSUBSCRIBE JÁ 
    // É FEITO AUTOMATICAMENTE

  }

  updateform(curso){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }



  onSubmit(){
    this.submited=true
    console.log(this.form)
    if(this.form.valid){
      console.log("Onsubmit")
      this.service.create(this.form.value)
      .subscribe(response=>{
        console.log(response)
        this.modalService.showAlertSuccess("Curso criado com sucesso")
        this.location.back()
      },error=>{
        console.log(error)
        this.modalService.showAlertDanger("Erro ao criar o curso")
      },()=>{
        console.log("Complete")
      })
    }
    
  }

  hasErrors(field:string){
    return this.form.get(field).errors
  }

  onCancel(){
    this.submited=false
    this.form.reset()
    console.log("onCancel")
  }

}
