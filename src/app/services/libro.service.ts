import { Injectable, inject } from '@angular/core';
import { Libro } from '../models/libro.model';
import { first } from 'rxjs';
import { collection, collectionData, deleteDoc, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private db : Firestore = inject(Firestore);
  constructor() { }

  //método para obtener todos los documentos de la colección
  getLibros(){
    const librosCollection = collection(this.db, 'libros');
    return collectionData((librosCollection), {idField: 'id'}).pipe(first());
  }

  //metodo para agregar un nuevo documento
  async agregarLibro(libro:Libro){
    const librosCollection = collection(this.db, 'libros');
    const libroData = {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anoPublicacion: libro.anoPublicacion
    };
    await addDoc(librosCollection, libroData);
  }

  //método para modificar un documento
  async modificarLibro(libro:Libro){
    const documentRef = doc(this.db, 'libros', libro.id);
    await updateDoc(documentRef, {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anoPublicacion: libro.anoPublicacion 
    });
  }

  //método para borrar un documento
  async eliminarLibro(libro:Libro){
    const documentRef = doc(this.db, 'libros', libro.id);
    await deleteDoc(documentRef);
  }
}