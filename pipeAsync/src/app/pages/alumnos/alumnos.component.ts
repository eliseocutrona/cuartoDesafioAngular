import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from 'src/app/shared/dialog/dialog-confirmacion/dialog-confirmacion.component';

export interface alumnos {
  nombre: string;
  apellido: string;
  email: string;
  numeroDocumento: number;
  fechaDeAlta: Date;
}

/**
 * @title Lista de alumnos
 */
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'nombreCompleto',
    'email',
    'numeroDocumento',
    'fechaDeAlta',
    'opciones',
  ];

  alumno: alumnos[] = [
    {
      nombre: 'Usuario1',
      apellido: 'Apellido1',
      email: 'Usuario1@hotmail.com',
      numeroDocumento: 11111111,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario2',
      apellido: 'Apellido2',
      email: 'Usuario2@hotmail.com',
      numeroDocumento: 22222222,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario3',
      apellido: 'Apellido3',
      email: 'Usuario3@hotmail.com',
      numeroDocumento: 33333333,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario4',
      apellido: 'Apellido4',
      email: 'Usuario4@hotmail.com',
      numeroDocumento: 44444444,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario5',
      apellido: 'Apellido5',
      email: 'Usuario5@hotmail.com',
      numeroDocumento: 55555555,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario6',
      apellido: 'Apellido6',
      email: 'Usuario6@hotmail.com',
      numeroDocumento: 66666666,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario7',
      apellido: 'Apellido7',
      email: 'Usuario7@hotmail.com',
      numeroDocumento: 77777777,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario8',
      apellido: 'Apellido8',
      email: 'Usuario8@hotmail.com',
      numeroDocumento: 88888888,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario9',
      apellido: 'Apellido9',
      email: 'Usuario9@hotmail.com',
      numeroDocumento: 99999999,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario10',
      apellido: 'Apellido10',
      email: 'Usuario10@hotmail.com',
      numeroDocumento: 10101010,
      fechaDeAlta: new Date(),
    },
    {
      nombre: 'Usuario11',
      apellido: 'Apellido11',
      email: 'Usuario11@hotmail.com',
      numeroDocumento: 11111111,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario12',
      apellido: 'Apellido12',
      email: 'Usuario12@hotmail.com',
      numeroDocumento: 12121212,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario13',
      apellido: 'Apellido13',
      email: 'Usuario13@hotmail.com',
      numeroDocumento: 13131313,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario14',
      apellido: 'Apellido14',
      email: 'Usuario14@hotmail.com',
      numeroDocumento: 14141414,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario15',
      apellido: 'Apellido15',
      email: 'Usuario15@hotmail.com',
      numeroDocumento: 15151515,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario16',
      apellido: 'Apellido16',
      email: 'Usuario16@hotmail.com',
      numeroDocumento: 16161616,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario17',
      apellido: 'Apellido17',
      email: 'Usuario17@hotmail.com',
      numeroDocumento: 17171717,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario18',
      apellido: 'Apellido18',
      email: 'Usuario18@hotmail.com',
      numeroDocumento: 18181818,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario19',
      apellido: 'Apellido19',
      email: 'Usuario19@hotmail.com',
      numeroDocumento: 19191919,
      fechaDeAlta: new Date()
  },
  {
      nombre: 'Usuario20',
      apellido: 'Apellido20',
      email: 'Usuario20@hotmail.com',
      numeroDocumento: 20202020,
      fechaDeAlta: new Date()
  }

  ];

  dataSource = new MatTableDataSource(this.alumno);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private matDialog: MatDialog) {}

  abrirABMAlumnos(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent);
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          { ...valor, fechaDeAlta: new Date() },
        ];
      }
    });

  }
  nuevoArray: alumnos[] = [];
  eliminar(ev: Event): void {
    let docAlumnoEliminar: number;
    docAlumnoEliminar = Number((ev.currentTarget as HTMLButtonElement)?.value);
    this.nuevoArray = [];
    const dialogRef = this.matDialog.open(DialogConfirmacionComponent,{
      data:{
          message: 'Está seguro que desea eliminar el registro del empleado con número de documento '+docAlumnoEliminar+'?'
      }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          for (let elemento of this.dataSource.data) {
            if (elemento.numeroDocumento != docAlumnoEliminar) {
              this.nuevoArray = [
                ...this.nuevoArray,
                elemento,
              ];
            }
          }
          this.dataSource.data = [...this.nuevoArray];
        }
    });

  }
}
