import { Injectable, inject } from '@angular/core';
import { first } from 'rxjs';
import { collection, collectionData, deleteDoc, Firestore, updateDoc, doc, addDoc } from '@angular/fire/firestore';

export interface Producto {
  id?: string;
  nombre: string;
  marca: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private db: Firestore = inject(Firestore);

  constructor() {}

  getProductos() {
    const productosCollection = collection(this.db, 'productos');
    return collectionData(productosCollection, { idField: 'id' }).pipe(first());
  }

  async agregarProducto(producto: Producto) {
    const productosCollection = collection(this.db, 'productos');
    const productoData = {
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precio
    };
    await addDoc(productosCollection, productoData);
  }

  async modificarProducto(producto: Producto) {
    if (!producto.id) throw new Error("El producto necesita un ID para ser modificado.");
    const documentRef = doc(this.db, 'productos', producto.id);
    await updateDoc(documentRef, {
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precio
    });
  }

  async eliminarProducto(producto: Producto) {
    if (!producto.id) throw new Error("El producto necesita un ID para ser eliminado.");
    const documentRef = doc(this.db, 'productos', producto.id);
    await deleteDoc(documentRef);
  }
}