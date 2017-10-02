import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../facturas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../servicios/proveedores.service';


@Component({
  selector: 'app-editfras',
  templateUrl: './editfras.component.html',
  styleUrls: ['./editfras.component.css']
})
export class EditfrasComponent implements OnInit {

  facturaForm: FormGroup;
  factura: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;

  id: string;

  proveedores: any[] = [];


  constructor(private pf: FormBuilder,
              private facturaService: FacturasService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private proveedoresService: ProveedoresService) {
      this.activatedRouter.params
        .subscribe( parametros => {
          this.id = parametros['id'];
            this.facturaService.getFactura( this.id)
              .subscribe( factura => this.factura = factura)
        });
      this.proveedoresService.getProveedores()
        .subscribe(proveedores => {
           for ( const id$ in proveedores) {
             const p = proveedores[id$];
             p.id$ = id$;
             this.proveedores.push(proveedores[id$]);
          }
        })
  }

  ngOnInit() {

    this.facturaForm = this.pf.group({
      proveedor: ['', Validators.required ],
      fecha: ['', Validators.required ],
      concepto: ['', [ Validators.required, Validators.minLength(10)] ],
      base: ['', Validators.required ],
      tipo: ['', Validators.required ],
      iva: this.iva ,
      total: this.total
    });

    this.onChanges();

  }

  onChanges(): void {
      this.facturaForm.valueChanges.subscribe(valor => {
        this.base = valor.base;
        this.tipo = valor.tipo;
        this.facturaForm.value.iva = this.base * this.tipo;
        this.facturaForm.value.total = this.base + (this.base * this.tipo);
      });
  }

  onSubmit() {
    this.factura = this.saveFactura();
    this.facturaService.putFactura( this.factura, this.id )
        .subscribe(newfra => {
          this.router.navigate(['/facturas'])
        })

  }

  saveFactura() {

    const saveFactura = {

      proveedor: this.facturaForm.get('proveedor').value,
      fecha: this.facturaForm.get('fecha').value,
      concepto: this.facturaForm.get('concepto').value,
      base: this.facturaForm.get('base').value,
      tipo: this.facturaForm.get('tipo').value,
      iva: this.facturaForm.get('iva').value,
      total: this.facturaForm.get('total').value

    };
    return saveFactura;
  }

}
