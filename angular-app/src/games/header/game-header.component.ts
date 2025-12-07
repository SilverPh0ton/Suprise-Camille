import {Component, computed, inject, input, output} from '@angular/core';
import {ProgressBar} from 'primeng/progressbar';
import {RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'game-header',
  imports: [
    ProgressBar,
    RouterLink
  ],
  templateUrl: './game-header.component.html'
})
export class GameHeader {
  protected messageService = inject(MessageService)

  public title = input.required<string>();
  public progressLabelBase = input.required<string>();

  public nbrOfItemsResolved = input.required<number>();
  public nbrOfAttempt = input.required<number>();
  public progressPercentage = input.required<number>();

  public resetGame = output<void>();

  protected progressLabel = computed(() =>
    `${this.nbrOfItemsResolved()} ${this.progressLabelBase()}${this.nbrOfItemsResolved() > 1 ? 's' : ''}`
  );

  protected attemptLabel = computed(() =>
    `${this.nbrOfAttempt()} essai${this.nbrOfAttempt() > 1 ? 's' : ''}`
  );
}
