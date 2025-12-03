import {Component, inject, OnInit} from '@angular/core';
import {MemoryCard} from '../card/memory-card';
import {MemoryCardsStore} from '../../state/memory-card.state';
import {MemoryCardHeader} from '../header/memory-card-header.component';

@Component({
  selector: 'memory-card-game',
  imports: [
    MemoryCard,
    MemoryCardHeader
  ],
  providers: [MemoryCardsStore],
  templateUrl: './memory-card-game.html'
})
export class MemoryCardGame implements OnInit {
  protected memoryCardsStore = inject(MemoryCardsStore);

  private sources = [
    'memory-card-img/cat/1.jpg',
    'memory-card-img/cat/2.jpg',
    'memory-card-img/cat/3.jpg',
    'memory-card-img/cat/4.jpg',
    'memory-card-img/cat/5.jpg',
    'memory-card-img/cat/6.jpg',
  ]

  public ngOnInit() {
    this.memoryCardsStore.initGameData(this.sources);
  }

  protected resetGame(): void {
    this.memoryCardsStore.resetGame(this.sources);
  }
}
