import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string){

    // Como vamos fazer o envio de arquivos na nossa request,
    // usaremos (em vez de um JSON) o formato "multipart/form-data
    const formData = new FormData()

    // Para cada arquivo no nosso Set, fazemos um 
    // append no formData criado. Este append tem 3 parametros:
    // 1) Nome do atributo (no nosso caso um 'file')
    // 2) O blob (que seri ao arquivo endo enviado) 
    // 3) O nome atribuido ao arquivo enviado.
    files.forEach(file=>{ 
      console.log(file)
      formData.append('file',file, file.name)
    })

    const request = new HttpRequest('POST', url, formData)

    return this.http.request(request)

    // PODERIAMOS USAR O POST DO HTTP DIRETAMENTE, COMO ABAIXO
    // return this.http.post(url, formData)

  }
}
