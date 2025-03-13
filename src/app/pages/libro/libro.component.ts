import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../models/libro.model';
import { LibroService } from '../../services/libro.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-libro',
  standalone: true,  // <-- Agrega esta línea
  imports: [FormsModule], 
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  libros: any;
  libro = new Libro();

  constructor(private libroService: LibroService) {
    this.getLibros();
  }

  async getLibros(): Promise<void> {
    this.libros = await firstValueFrom(this.libroService.getLibros());
  }

  insertarLibro() {
    this.libroService.agregarLibro(this.libro);
    this.libro = new Libro();
    this.getLibros();
  }

  selectLibro(libroSeleccionado: Libro) {
    this.libro = libroSeleccionado;
  }

  updateLibro() {
    this.libroService.modificarLibro(this.libro);
    this.libro = new Libro();
    this.getLibros();
  }

  deleteLibro() {
    this.libroService.eliminarLibro(this.libro);
    this.libro = new Libro();
    this.getLibros();
  }
}
