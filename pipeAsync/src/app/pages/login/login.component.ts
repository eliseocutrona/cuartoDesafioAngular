import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, fromEvent, map, Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/services/AuthService';
import { Time,TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit,OnDestroy {
  hide = true;
  isLoggedIn = new Subject<Usuario>();
  horaActual : Time | null = null;

  // horaActual$: Observable<Time>;
  subscriptionRef : Subscription | null;
  contrasenaControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);
  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20),
  ]);

  authForm = new FormGroup({
    contraseña: this.contrasenaControl,
    nombre: this.nombreControl,
  });

  constructor(private authService: AuthService,
              private timeService: TimeService) {
                this.subscriptionRef = this.timeService.reloj.subscribe((valor) => this.horaActual = valor);
  }

  async ngOnInit(): Promise<void> {
    const clicks = fromEvent<PointerEvent>(document, 'click');
    const positions = clicks.pipe(map((ev) => ev.clientX));

    positions.subscribe((x) => console.log(x));
  }
  login(): void {
    this.authService.login({
      ...(this.authForm.value as any),
    });

    const obtenerUsuario = new Promise((resolve, reject) => {
      if (this.nombreControl.value == 'Eliseo') {
        resolve('Usuario admin');
      } else {
        reject('Otro usuario');
      }
    });
    obtenerUsuario.then(
      function () {
        console.log('Se logueo el usuario administrador');
      },
      function () {
        console.log('Se logueo un otro usuario');
      }
    );
  }
  ngOnDestroy(): void {
    this.isLoggedIn.complete();
    this.subscriptionRef?.unsubscribe();
  }
}
