import { Component, OnInit, Input } from '@angular/core';
import { LoadfileService } from '../../servicios/loadfile.service';
import { Archivo } from '../../upload/file.model';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() upload: Archivo;

  constructor(private loadfileService: LoadfileService) { }

  ngOnInit() {
  }

  deleteUpload(upload) {
    this.loadfileService.deleteUpload(this.upload);
  }

}
