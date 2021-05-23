import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from "@angular/common";

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
    private location: Location) { }

  ngOnInit() {


    this.form = this.fb.group({
      nome: [null,[Validators.required,
         Validators.minLength(3),Validators.maxLength(250)]]
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
