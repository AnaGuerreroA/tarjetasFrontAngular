import { Component, OnInit, Output } from '@angular/core';
import { baseDatos, Tarjeta } from 'src/app/models/tarjetas.model';
import { TarjetasService } from 'src/app/services/tarjetas.service';
import { EventEmitter } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  @Output() onSaveComplete = new EventEmitter<Tarjeta[]>();

  informacion = new UntypedFormControl('', [Validators.required, Validators.maxLength(500)]);

 

  tarjeta: Tarjeta = {
    id: 0,
    titulo: "example",
    informacion: "example" ,    
    sistema: 1,
    baseDatos: baseDatos.Facope
  };

  baseDatos = [
    { value: 1, name: 'Facope' },
    { value: 2, name: 'Core' }
  ];
  constructor(private tarjetasService: TarjetasService) { }

  ngOnInit(): void { }

  onSave() {
    console.log(this.tarjeta)
    console.log(this.tarjeta.informacion)
    this.tarjetasService.saveTarjeta(this.tarjeta)
        .subscribe(response => {
            // Emit the event
            this.onSaveComplete.emit();
           
        }, error => {
            console.log(error);
        });
    }

}
