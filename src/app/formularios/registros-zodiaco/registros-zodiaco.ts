import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-registros-zodiaco',
  imports: [],
  templateUrl: './registros-zodiaco.html',
})
export class RegistrosZodiaco {
  @Input() registros: any[] = [];
  @Output() editar = new EventEmitter<number>();
  @Output() eliminar = new EventEmitter<number>();
  @Output() volver = new EventEmitter<void>();

  onEditar(index: number): void {
    this.editar.emit(index);
  }

  onEliminar(index: number): void {
    this.eliminar.emit(index);
  }

  onVolver(): void {
    this.volver.emit();
  }
}
