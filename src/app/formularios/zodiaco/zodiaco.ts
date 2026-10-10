import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {
  formulario = new FormGroup({
    nombre: new FormControl(''),
    apaterno: new FormControl(''),
    amaterno: new FormControl(''),
    dia: new FormControl(),
    mes: new FormControl(),
    anio: new FormControl(),
    sexo: new FormControl('Masculino'),
  });

  signos = [
    { nombre: 'Mono', imagen: 'imagenes-signos/Mono.png' },
    { nombre: 'Gallo', imagen: 'imagenes-signos/Gallo.png' },
    { nombre: 'Perro', imagen: 'imagenes-signos/Perro.png' },
    { nombre: 'Cerdo', imagen: 'imagenes-signos/Cerdo.png' },
    { nombre: 'Rata', imagen: 'imagenes-signos/Rata.png' },
    { nombre: 'Buey', imagen: 'imagenes-signos/Buey.png' },
    { nombre: 'Tigre', imagen: 'imagenes-signos/Tigre.png' },
    { nombre: 'Conejo', imagen: 'imagenes-signos/Conejo.png' },
    { nombre: 'Dragón', imagen: 'imagenes-signos/Dragon.png' },
    { nombre: 'Serpiente', imagen: 'imagenes-signos/Serpiente.png' },
    { nombre: 'Caballo', imagen: 'imagenes-signos/Caballo.png' },
    { nombre: 'Cabra', imagen: 'imagenes-signos/Cabra.png' },
  ];

  nombreCompleto = '';
  saludo = '';
  edad = 0;
  signo = '';
  imagen = '';
  resultado = false;

  imprimir() {
    const nombre = this.formulario.value.nombre;
    const apaterno = this.formulario.value.apaterno;
    const amaterno = this.formulario.value.amaterno;
    const dia = Number(this.formulario.value.dia);
    const mes = Number(this.formulario.value.mes);
    const anio = Number(this.formulario.value.anio);
    const sexo = this.formulario.value.sexo;

    this.nombreCompleto = nombre + ' ' + apaterno + ' ' + amaterno;

    if (sexo === 'Femenino') {
      this.saludo = 'Bienvenida';
    } else {
      this.saludo = 'Bienvenido';
    }

    const hoy = new Date();
    let edadCalculada = hoy.getFullYear() - anio;
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();

    if (mesActual < mes || (mesActual === mes && diaActual < dia)) {
      edadCalculada = edadCalculada - 1;
    }
    this.edad = edadCalculada;

    const residuo = anio % 12;
    this.signo = this.signos[residuo].nombre;
    this.imagen = this.signos[residuo].imagen;

    this.resultado = true;
  }

  limpiar() {
    this.formulario.reset({ sexo: 'Masculino' });
    this.resultado = false;
  }
}
