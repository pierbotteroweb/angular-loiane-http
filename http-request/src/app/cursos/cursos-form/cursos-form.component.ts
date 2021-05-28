import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from "rxjs/operators";
import { Cursos2Service } from '../cursos2.service';

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
    private service: Cursos2Service,
    // SUBSTITUIMOS O SERVICE DEDICADO ABAIXO PELO
    // SERVICE ACIMA QUE ESTÁ EXTENDENDO O SERVICE GENERICO CRIADO
              // private service: CursosService,
    // private service: Cursos2Service,
    private modalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) {}

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
        

        // AULA 130 - COMO ESTAMOS USANDO O RESOLVER DE ROTA, 
        // A CHAMADA ABAIXO É FEIRA NO GUARD CONFIGURADO
        // this.route.params.pipe(
        //   map((params:any)=>params['id']),
        //   switchMap(id=>this.service.loadById(id))
        // ).subscribe(curso=>this.updateform(curso))

    // COMO ESTAMOS FAZENDO USO DO OBSERVABLE ROUTE.PARAMS,
    // NÃO É NECESSÁRIO VAZER O UNSUBSCRIBE DOS SUBSCRIBES LISTADOS,
    // POIS COM A MUDANÇA DE ROTA, O UNSUBSCRIBE JÁ 
    // É FEITO AUTOMATICAMENTE

    // AQUI OBTEMOS O RETURN DA CHAMADA FEITA NO NOSSO RESOLVER GUARD
    const curso = this.route.snapshot.data['curso'];
    
    // FAZEMOS A DECLARAÇÃO DO FORM AQUI E JÁ ATROBUIMOS
    // NO FORM, OS VALORES OBTIDOS NO RESOLVER
    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome,[Validators.required,
        Validators.minLength(3),Validators.maxLength(250)]]
    }) 

  }
  
  // COM O USO DO RESOLVER PARA OBTER OS DADOS,
  // NÃO PRECISAMOS MAIS DO UPDATEFORM
  // updateform(curso){
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }



  onSubmit(){
    this.submited=true
    if(this.form.valid){

      let msgSucess = "Curso criado com sucesso!"
      let msgError = "Erro ao criar o curso, tente novamente!"
      if(this.form.value.id){
        msgSucess = "Curso atualizado com sucesso!"
        msgError = "Erro ao atualizar o curso, tente novamente!"        
      }

      this.service.save(this.form.value)
      .subscribe(response=>{
        console.log(response)
        this.modalService.showAlertSuccess(msgSucess)
        this.location.back()
      },error=>{
        console.log(error)
        this.modalService.showAlertDanger(msgError)
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
