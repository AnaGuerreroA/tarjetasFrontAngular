import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { TarjetasService } from 'src/app/services/tarjetas.service';
import { baseDatos, Tarjeta, searchTarjetaDTO } from 'src/app/models/tarjetas.model';
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
  term:string = "";
  
  listaTarjetas: Tarjeta[] = [];

  buscaTarjetas: searchTarjetaDTO[] = [];

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
                this.buscaTarjetas = response;
                this.buscaTarjetas =  this.buscaTarjetas.map(x => {
                                        const newX = {...x};
                                        newX.sistemaString = x.sistema === 1 ? 'Perfiles' : x.sistema === 2 ? 'FDO' : x.sistema === 3 ? 'Factoring' : 'Desconocido';
                                        newX.baseDatosString = x.baseDatos === 1 ? 'Facope' : x.baseDatos === 2 ? 'Core' : 'Desconocido';
                                        return newX;
                                      });

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
