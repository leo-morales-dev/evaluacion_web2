import { Injectable, inject } from '@angular/core';
import { Ejercicio } from '../models/ejercicio.model';
import { first } from 'rxjs';
import { collection, collectionData,deleteDoc,Firestore,updateDoc } from '@angular/fire/firestore';
import { addDoc,doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private db: Firestore = inject(Firestore);

  constructor() { }

  getEjercicios(){
    const ejercicioCollection = collection(this.db, 'ejercicio');
    return collectionData(ejercicioCollection,{idField: 'id'})
      .pipe(first());
  }

  async agregarEjercicio(ejercicio: Ejercicio) {
      const ejercicioCollection = collection(this.db, 'ejercicio');
      const ejercicioData = {
        nombre: ejercicio.nombre,
        categoria: ejercicio.categoria,
        duracion: ejercicio.duracion,
      };
      await addDoc(ejercicioCollection, ejercicioData);
    }

  async modificarEjercicio(ejercicio: Ejercicio){
    const documentRef = doc(this.db, 'ejercicio', ejercicio.id);
    await updateDoc(documentRef, {
      nombre: ejercicio.nombre,
        categoria: ejercicio.categoria,
        duracion: ejercicio.duracion,
    });
  }
  async eliminarEjercicio(ejercicio: Ejercicio){
    const documentRef = doc(this.db, 'ejercicio', ejercicio.id);
    await deleteDoc(documentRef);
  }
}