import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  // Set ep uma interface de dados do Javascript
  // que usamos aqui para evitar que arquivos duplicado ssejam enviados.
  // Mas poderiamos ter usado um tipo Array
  files: Set<File>;
  sub: Subscription
  progress:number = 0

  constructor(private service: UploadFileService) { }

  ngOnInit() {
  }
  
  onChange(event){
    console.log(event)

    const selectedFiles = <FileList>event.srcElement.files
    
     

    const fileNames = [];
    this.files = new Set();
    // selectedFiles.map(fileName=>{
    //   fileNames.push(fileName)
    // })

    for (let i = 0; i< selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name)
      this.files.add(selectedFiles[i])
    }

    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ')

    this.progress = 0

  }

  onUpload(){
    
    if(this.files&&this.files.size > 0){
      // Usando a URL confirugara no nosso serviço em node
      // que está usando a porta 8000
      // this.sub = this.service.upload(this.files, 'http://localhost:8000/upload')
      // this.sub = this.service.upload(this.files, '/api/upload')
      this.sub = this.service.upload(this.files, environment.BASE_URL+'/upload') // <== REMOVENDO A URL E USANDO A REF API PARA  
                                                                                 // REQUISIÇÕES USANDO NOSSO PROXY, E ASSIM
                                                                                 // ELIMINANDO A NECESSIDADE DE HANILITAR O CORS
                                                                                 // ESSE /api TAMBÉM PODE SER DEFINIDO NO ENVIRONMENT
      .subscribe((event: HttpEvent<object>)=>{
        console.log("Response com o conteudo do observe events nas opções do serviço: ",event)
        if(event.type=== HttpEventType.Response){
          console.log("Upload concluido")
        } else if (event.type=== HttpEventType.UploadProgress){
          const percentDone = Math.round((event.loaded * 100) / event.total)
          console.log("Progresso", percentDone)
          this.progress = percentDone
        }

      })      
      // PRECISAMOS FAZER UM UNSUBSCRIBE PAR AO OBSERVABLE USADO NO UPLOAD
      // COMO EXISTE UMA SEQUENCIA DE CHAMADAS EM UM PROCESOS D EUPLOAD, NÃO É RECOMENDADO 
      // QUE SE USE UM TAKE(1). POR ISSO PODEMOS FAZER O UNSUBSCRIBE NO NGONDESTROY

    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
    console.log("Upload ubsubscribed")
  }
}
