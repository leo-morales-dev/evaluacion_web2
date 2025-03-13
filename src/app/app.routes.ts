import { LibroComponent } from './pages/libro/libro.component'; 
import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ProductoComponent } from './pages/producto/producto.component'; 
import { HomeComponent } from './pages/home/home.component';
import { EjercicioComponent } from './pages/ejercicio/ejercicio.component';

export const routes: Routes = [
    {
        path : 'home',
        component: HomeComponent
    },
    {
        path : 'producto',
        component: ProductoComponent
    },
    {
        path: 'libro',
        component: LibroComponent
    },
    {
        path: 'ejercicio',
        component:EjercicioComponent
    },
    {
        path: 'about',
        component:AboutComponent
    },
    {
        path:'**',
        redirectTo: 'home'
    }
];