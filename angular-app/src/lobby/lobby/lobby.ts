import {Component, inject} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {ProgressStore} from '../progress.state';
import {CryptexPreview} from '../cryptex-preview/cryptex-preview';
import {HintModal} from '../hint-modal/hint-modal';

@Component({
  selector: 'lobby',
  imports: [
    ButtonLabel,
    RouterLink,
    Button,
    CryptexPreview,
    HintModal
  ],
  templateUrl: './lobby.html',
})
export class Lobby {
  protected progressStore = inject(ProgressStore);
}
