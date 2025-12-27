import {Component, computed, inject} from '@angular/core';
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

  protected gameLinks = computed(() => [
    {routerLink: '/memory-card/1', label: '1er lettre', isResolved: this.progressStore.isFirstLetterUnlocked()},
    {routerLink: '/word-scramble/1', label: '2e lettre', isResolved: this.progressStore.isSecondLetterUnlocked()},
    {routerLink: '/memory-card/2', label: '3e lettre', isResolved: this.progressStore.isThirdLetterUnlocked()},
    {routerLink: '/word-scramble/2', label: '4e lettre', isResolved: this.progressStore.isFourthLetterUnlocked()},
    {routerLink: '/memory-card/3', label: '5e lettre', isResolved: this.progressStore.isFifthLetterUnlocked()},
    {routerLink: '/word-scramble/3', label: '6e lettre', isResolved: this.progressStore.isSixthLetterUnlocked()},
  ]);
}
