import {Component, inject} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {ProgressStore} from './progress.state';

@Component({
  selector: 'app-lobby',
  imports: [
    ButtonLabel,
    RouterLink,
    Button
  ],
  templateUrl: './lobby.html',
})
export class Lobby {
  protected progressStore = inject(ProgressStore);
}
