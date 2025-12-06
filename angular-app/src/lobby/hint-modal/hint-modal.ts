import {Component, inject, signal} from '@angular/core';
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
export class HintModal {
  protected progressStore = inject(ProgressStore);

  protected visible = signal(false);

  protected showDialog() {
    this.visible.set(true);
  }
}
