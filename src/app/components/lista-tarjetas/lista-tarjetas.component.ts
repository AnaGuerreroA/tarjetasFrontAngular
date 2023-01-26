import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { TarjetasService } from 'src/app/services/tarjetas.service';
import { baseDatos, Tarjeta } from 'src/app/models/tarjetas.model';
import { tap, take } from 'rxjs/operators';
import { zip } from 'rxjs'
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-lista-tarjetas',
  templateUrl: './lista-tarjetas.component.html',
  styleUrls: ['./lista-tarjetas.component.css']
})
export class ListaTarjetasComponent implements OnInit {
  @Input() onSaveComplete: EventEmitter<void> = new EventEmitter<void>();

  
  listaTarjetas: Tarjeta[] = [];

  constructor(
    private tarjetasService: TarjetasService,
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
    this.listarTarjetas();    
  }

  listarTarjetas() {
    console.log('aca')   
    this.tarjetasService.listaTarjetas()
            .subscribe(response => {
              console.log(response)
                this.listaTarjetas = response;
    });
  }
    
  eliminaTarjetas(id:number)
  {

    this.tarjetasService.eliminarTarjetas(id).pipe(
      tap(_ => this.tarjetasService.listaTarjetas().pipe(take(1)).subscribe(
        newList => this.listaTarjetas = newList ))
      ).subscribe(console.log);
  }

  // Listen for the event
  onTarjetaSaved() {
    console.log('fuck2')
    this.listarTarjetas();   
  }  

  copyHeroName() {
    this.clipboard.copy('Alphonso');
  }

}
