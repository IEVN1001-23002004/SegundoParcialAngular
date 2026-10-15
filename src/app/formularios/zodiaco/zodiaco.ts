import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistrosZodiaco } from '../registros-zodiaco/registros-zodiaco';

@Component({
  imports: [ReactiveFormsModule, RegistrosZodiaco],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco implements OnInit {
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

  registros: any[] = [];
  indiceEdicion: number = -1;
  mostrarRegistros: boolean = false;

  toggleRegistros(): void {
    this.mostrarRegistros = !this.mostrarRegistros;
  }

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('zodiaco');
    if (datos) {
      this.registros = JSON.parse(datos);
    } else {
      this.registros = [];
    }
  }

  imprimir(): void {
    const nombre = this.formulario.value.nombre;
    const apaterno = this.formulario.value.apaterno;
    const amaterno = this.formulario.value.amaterno;
    const dia = Number(this.formulario.value.dia);
    const mes = Number(this.formulario.value.mes);
    const anio = Number(this.formulario.value.anio);
    const sexo = this.formulario.value.sexo || 'Masculino';

    if (!nombre || !apaterno || !amaterno || !dia || !mes || !anio) {
      this.resultado = false;
      return;
    }

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

    const nuevoRegistro = {
      nombre: this.nombreCompleto,
      nombrePila: nombre,
      apaterno: apaterno,
      amaterno: amaterno,
      dia: dia,
      mes: mes,
      anio: anio,
      fecha: dia + '/' + mes + '/' + anio,
      sexo: sexo,
      edad: this.edad,
      signo: this.signo,
    };

    if (this.indiceEdicion !== -1) {
      this.registros[this.indiceEdicion] = nuevoRegistro;
      this.indiceEdicion = -1;
    } else {
      this.registros.push(nuevoRegistro);
    }

    localStorage.setItem('zodiaco', JSON.stringify(this.registros));
  }

  editarRegistro(index: number): void {
    const reg = this.registros[index];
    if (!reg) return;

    this.indiceEdicion = index;

    let nombre = reg.nombrePila || '';
    let apaterno = reg.apaterno || '';
    let amaterno = reg.amaterno || '';

    if (!nombre && reg.nombre) {
      const partes = reg.nombre.split(' ');
      nombre = partes[0] || '';
      apaterno = partes[1] || '';
      amaterno = partes.slice(2).join(' ') || '';
    }

    let dia = reg.dia;
    let mes = reg.mes;
    let anio = reg.anio;

    if ((!dia || !mes || !anio) && reg.fecha) {
      const partesFecha = reg.fecha.split('/');
      dia = Number(partesFecha[0]);
      mes = Number(partesFecha[1]);
      anio = Number(partesFecha[2]);
    }

    this.formulario.patchValue({
      nombre: nombre,
      apaterno: apaterno,
      amaterno: amaterno,
      dia: dia,
      mes: mes,
      anio: anio,
      sexo: reg.sexo || 'Masculino',
    });

    this.nombreCompleto = reg.nombre;
    this.saludo = reg.sexo === 'Femenino' ? 'Bienvenida' : 'Bienvenido';
    this.edad = reg.edad;
    this.signo = reg.signo;
    const residuo = Number(anio) % 12;
    this.imagen = this.signos[residuo]?.imagen || '';
    this.resultado = true;
    this.mostrarRegistros = false;
  }

  eliminarRegistro(index: number): void {
    this.registros.splice(index, 1);
    localStorage.setItem('zodiaco', JSON.stringify(this.registros));
    if (this.indiceEdicion === index) {
      this.limpiar();
    } else if (this.indiceEdicion > index) {
      this.indiceEdicion--;
    }
  }

  limpiar(): void {
    this.formulario.reset({ sexo: 'Masculino' });
    this.indiceEdicion = -1;
    this.resultado = false;
    this.nombreCompleto = '';
    this.saludo = '';
    this.edad = 0;
    this.signo = '';
    this.imagen = '';
  }

  limpiarRegistros(): void {
    this.registros = [];
    localStorage.removeItem('zodiaco');
    this.limpiar();
  }
}
