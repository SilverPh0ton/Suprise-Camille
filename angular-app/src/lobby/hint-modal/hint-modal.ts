import {Component, effect, inject, OnInit, signal} from '@angular/core';
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
