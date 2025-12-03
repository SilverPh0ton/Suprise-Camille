import {Component, computed, input} from '@angular/core';
import {ProgressBar} from 'primeng/progressbar';

@Component({
  selector: 'memory-card-header',
  imports: [
    ProgressBar
  ],
  templateUrl: './memory-card-header.component.html'
})
export class MemoryCardHeader {

  public nbrOfResolvedCards = input.required<number>();
  public nbrOfAttempt = input.required<number>();
  public progressPercentage = input.required<number>();


  protected progressLabel = computed(() =>
    `${this.nbrOfResolvedCards() / 2} pair${this.nbrOfResolvedCards() > 2 ? 's' : ''}`
  );

  protected attemptLabel = computed(() =>
    `${this.nbrOfAttempt()} essai${this.nbrOfAttempt() > 1 ? 's' : ''}`
  );
}
