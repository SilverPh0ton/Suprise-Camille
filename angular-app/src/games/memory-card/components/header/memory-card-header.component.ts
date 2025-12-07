import {Component, computed, inject, input, output} from '@angular/core';
import {ProgressBar} from 'primeng/progressbar';
import {RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'memory-card-header',
  imports: [
    ProgressBar,
    RouterLink
  ],
  templateUrl: './memory-card-header.component.html'
})
export class MemoryCardHeader {
  protected messageService = inject(MessageService)

  public nbrOfResolvedCards = input.required<number>();
  public nbrOfAttempt = input.required<number>();
  public progressPercentage = input.required<number>();

  public resetGame = output<void>();

  protected progressLabel = computed(() =>
    `${this.nbrOfResolvedCards() / 2} pair${this.nbrOfResolvedCards() > 2 ? 's' : ''}`
  );

  protected attemptLabel = computed(() =>
    `${this.nbrOfAttempt()} essai${this.nbrOfAttempt() > 1 ? 's' : ''}`
  );
}
