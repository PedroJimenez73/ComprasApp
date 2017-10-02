import { Component } from '@angular/core';
import { Archivo } from './file.model';
import { LoadfileService } from '../servicios/loadfile.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent  {

  selectedFiles: FileList;
  currentUpload: Archivo;

  loading = false;

  constructor (public loadfileService: LoadfileService) {}

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Archivo(file);
    this.loading = true;
    this.loadfileService.pushUpload(this.currentUpload);
  }
}
