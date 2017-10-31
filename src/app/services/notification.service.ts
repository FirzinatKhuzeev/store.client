import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CLOSE } from '../helpers/constants';

@Injectable()
export class NotificationService {
  constructor(public snackBar: MatSnackBar) { }
  public notify(message: string): void {
    this.snackBar.open(message, CLOSE, { duration: 2000 });
  }
}
