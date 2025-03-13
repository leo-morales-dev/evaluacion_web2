import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-producto',
  standalone: true, // <-- Agrega esta línea
  imports: [FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  productos: any;
  producto = new Producto(); // Nuevo producto vacío

  constructor(private productoService: ProductoService) {
    this.getProductos();
  }
  
  // Método para obtener todos los productos
  async getProductos(): Promise<void> {
    this.productos = await firstValueFrom(this.productoService.getProductos());
  }

  // Método para insertar un producto desde el formulario
  insertarProducto() {
    this.productoService.agregarProducto(this.producto);
    this.producto = new Producto();
    this.getProductos();
  }

  // Método para seleccionar un producto de la tabla
  selectProducto(productoSeleccionado: Producto) {
    this.producto = productoSeleccionado;
  }

  // Método para modificar producto en el formulario
  updateProducto() {
    this.productoService.modificarProducto(this.producto);
    this.producto = new Producto();
    this.getProductos();
  }

  // Método para eliminar producto
  deleteProducto() {
    this.productoService.eliminarProducto(this.producto);
    this.producto = new Producto();
    this.getProductos();
  }
}
