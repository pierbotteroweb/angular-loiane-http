import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadFileRoutingModule } from './upload-file-routing.module';



@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    UploadFileRoutingModule
  ]
})
export class UploadFileModule { }
