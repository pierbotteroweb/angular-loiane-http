import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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



  }

  onUpload(){
    
    if(this.files&&this.files.size > 0){
      // Usando a URL confirugara no nosso serviço em node
      // que está usando a porta 8008
      this.sub = this.service.upload(this.files, 'http://localhost:8000/upload')
      .subscribe(res=>console.log("Response: ",res,"File: ", this.files))

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
