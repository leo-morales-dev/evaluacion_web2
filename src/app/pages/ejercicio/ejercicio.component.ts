import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ejercicio } from '../../models/ejercicio.model';
import { EjercicioService } from '../../services/ejercicio.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-ejercicio',
  standalone: true, // <-- Agrega esta línea
  imports: [FormsModule],
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css'],
})
export class EjercicioComponent {
  
  ejercicios: any;
  ejercicio = new Ejercicio();

  constructor(private ejercicioService: EjercicioService) { 
    this.getEjercicios();
  }

  async getEjercicios(): Promise<void> {
    this.ejercicios = await firstValueFrom(this.ejercicioService.getEjercicios());
  }

  agregarEjercicio() {
    this.ejercicioService.agregarEjercicio(this.ejercicio);
    this.ejercicio = new Ejercicio();
    this.getEjercicios();
  }

  selectEjercicio(ejercicioSeleccionado: Ejercicio) { 
    this.ejercicio = ejercicioSeleccionado;
  }

  updateEjercicio() {
    this.ejercicioService.modificarEjercicio(this.ejercicio);
    this.ejercicio = new Ejercicio();
    this.getEjercicios();
  }

  deleteEjercicio() {
    this.ejercicioService.eliminarEjercicio(this.ejercicio);
    this.ejercicio = new Ejercicio();
    this.getEjercicios();
  }
}
