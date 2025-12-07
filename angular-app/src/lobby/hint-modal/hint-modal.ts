import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {Dialog} from 'primeng/dialog';
import {Button, ButtonLabel} from 'primeng/button';
import {ProgressStore} from '../progress.state';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'hint-modal',
  imports: [AccordionHeader,
    AccordionPanel,
    AccordionContent,
    Accordion,
    Dialog, Button, ButtonLabel, RouterLink,],
  templateUrl: './hint-modal.html',
})
export class HintModal implements OnInit {
  protected progressStore = inject(ProgressStore);

  protected visible = signal(false);

  protected hintLinks = computed(() => [
    {
      routerLink: '/word-scramble/4',
      label: '1',
      isResolved: this.progressStore.isFirstHintUnlocked(),
      isEnabled: true
    },
    {
      routerLink: '/memory-card/4',
      label: '2',
      isResolved: this.progressStore.isSecondHintUnlocked(),
      isEnabled: this.progressStore.isFirstHintUnlocked()
    },
    {
      routerLink: '/word-scramble/5',
      label: '3',
      isResolved: this.progressStore.isThirdHintUnlocked(),
      isEnabled: this.progressStore.isSecondHintUnlocked()
    },
    {
      routerLink: '/memory-card/5',
      label: '4',
      isResolved: this.progressStore.isFourthHintUnlocked(),
      isEnabled: this.progressStore.isThirdHintUnlocked()
    },
    {
      routerLink: '/word-scramble/6',
      label: 'Solution',
      isResolved: this.progressStore.isSolutionUnlocked(),
      isEnabled: this.progressStore.isFourthHintUnlocked()
    },
  ]);

  protected hintContents = computed(() => [
    {
      header: 'Indice I',
      content: 'Il y a 2 déchiffrements à faire',
      isEnabled: this.progressStore.isFirstHintUnlocked()
    },
    {
      header: 'Indice II',
      content: 'Convertie les lettres en chiffre',
      isEnabled: this.progressStore.isSecondHintUnlocked()
    },
    {
      header: 'Indice III',
      content: 'Chiffrement de Vigenère',
      isEnabled: this.progressStore.isThirdHintUnlocked()
    },
    {
      header: 'Indice IV',
      content: 'La clé est la même que pour le cryptex',
      isEnabled: this.progressStore.isFourthHintUnlocked()
    },
  ]);

  constructor() {
    effect(() => {
      window.sessionStorage.setItem('is-hint-opened', `${this.visible()}`);
    });
  }

  public ngOnInit() {
    const savedState = window.sessionStorage.getItem('is-hint-opened');
    this.visible.set(savedState === 'true');
  }

  protected showDialog() {
    this.visible.set(true);
  }
}
