import {Component, computed, inject, OnInit} from '@angular/core';
import {MemoryCard} from '../card/memory-card';
import {MemoryCardsStore} from '../../state/memory-card.state';
import {ProgressBar} from 'primeng/progressbar';
import {MemoryCardHeader} from '../header/memory-card-header.component';

@Component({
  selector: 'memory-card-game',
  imports: [
    MemoryCard,
    ProgressBar,
    MemoryCardHeader
  ],
  providers: [MemoryCardsStore],
  templateUrl: './memory-card-game.html'
})
export class MemoryCardGame implements OnInit {
  protected memoryCardsStore = inject(MemoryCardsStore);

  protected progressLabel = computed(() =>
    `${this.memoryCardsStore.nbrOfResolvedCards() / 2} pair${this.memoryCardsStore.nbrOfResolvedCards() > 2 ? 's' : ''}`
  );

  protected attemptLabel = computed(() =>
    `${this.memoryCardsStore.nbrOfAttempt()} essai${this.memoryCardsStore.nbrOfAttempt() > 1 ? 's' : ''}`
  );

  ngOnInit() {
    this.memoryCardsStore.initGameData([
      'memory-card-img/cat/1.jpg',
      'memory-card-img/cat/2.jpg',
      'memory-card-img/cat/3.jpg',
      'memory-card-img/cat/4.jpg',
      'memory-card-img/cat/5.jpg',
      'memory-card-img/cat/6.jpg',
    ]);
  }
}
