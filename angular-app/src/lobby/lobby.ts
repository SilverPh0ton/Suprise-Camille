import {Component} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
import {RouterLink} from '@angular/router';

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

}
