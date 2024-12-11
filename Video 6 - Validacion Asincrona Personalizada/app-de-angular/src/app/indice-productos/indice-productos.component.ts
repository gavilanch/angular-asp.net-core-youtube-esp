import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LaptopService } from '../laptop.service';
import { Laptop } from '../laptop.models';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";

@Component({
  selector: 'app-indice-productos',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './indice-productos.component.html',
  styleUrl: './indice-productos.component.css'
})
export class IndiceProductosComponent {
  laptopService = inject(LaptopService);
  laptops?: Laptop[];
  columnasAMostrar = ['nombre', 'acciones']

  constructor(){
   this.cargarProductos();
  }

  cargarProductos(){
    this.laptopService.obtenerTodos().subscribe(laptops => {
      this.laptops = laptops;
    });
  }

  borrar(id: number){
    this.laptopService.borrar(id).subscribe(() => {
      this.laptops = undefined;
      Swal.fire("Exitoso", "El registro ha sido borrado exitosamente", 'success');

      this.cargarProductos();
    });
  }
}
