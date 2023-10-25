import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Time {
  hora: number;
  minutos: number;
  segundos: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private _reloj$ = new BehaviorSubject<Time>(this.currentTime)
  constructor() {
    setInterval(() => {
      this._reloj$.next(this.currentTime);
    },1000)
   }

  get reloj(): Observable<Time>{
    return this._reloj$.asObservable();
  }

  get currentTime(): Time {
    const now = new Date();
    return{
      hora: now.getHours(),
      minutos: now.getMinutes(),
      segundos: now.getSeconds(),
    }
  }
}
