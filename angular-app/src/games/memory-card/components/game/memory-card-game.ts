import {Component, inject, OnInit} from '@angular/core';
import {MemoryCard} from '../card/memory-card';
import {MemoryCardsStore} from '../../state/memory-card.state';
import {MemoryCardHeader} from '../header/memory-card-header.component';
import {ActivatedRoute} from '@angular/router';

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
  protected route = inject(ActivatedRoute);

  private setId: number = 1;
  private sourcesMap: Record<number, string[]> = {
    1: [
      'memory-card-img/cat/1.jpg', 'memory-card-img/cat/2.jpg', 'memory-card-img/cat/3.jpg',
      'memory-card-img/cat/4.jpg', 'memory-card-img/cat/5.jpg', 'memory-card-img/cat/6.jpg',
    ],
    2: [
      'memory-card-img/cat/7.jpg', 'memory-card-img/cat/8.jpg', 'memory-card-img/cat/9.jpg',
      'memory-card-img/cat/10.jpg', 'memory-card-img/cat/11.jpg', 'memory-card-img/cat/12.jpg',
    ],
    3: [
      'memory-card-img/cat/13.jpg', 'memory-card-img/cat/14.jpg', 'memory-card-img/cat/15.jpg',
      'memory-card-img/cat/16.jpg', 'memory-card-img/cat/17.jpg', 'memory-card-img/cat/18.jpg',
    ],
    4: [
      'memory-card-img/cat/19.jpg', 'memory-card-img/cat/20.jpg', 'memory-card-img/cat/21.jpg',
      'memory-card-img/cat/22.jpg', 'memory-card-img/cat/23.jpg', 'memory-card-img/cat/24.jpg',
    ],
    5: [
      'memory-card-img/couple/1.jpg', 'memory-card-img/couple/2.jpg', 'memory-card-img/couple/3.jpg',
      'memory-card-img/couple/4.jpg', 'memory-card-img/couple/5.jpg', 'memory-card-img/couple/6.jpg',
    ],
  }

  public ngOnInit() {
    this.setId = Number(this.route.snapshot.paramMap.get('set'));
    this.memoryCardsStore.initGameData(this.sourcesMap[this.setId]);
  }

  protected resetGame(): void {
    this.memoryCardsStore.resetGame(this.sourcesMap[this.setId]);
  }
}
