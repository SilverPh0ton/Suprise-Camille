import {Component, computed, input, output} from '@angular/core';

@Component({
  selector: 'memory-card',
  imports: [],
  templateUrl: './memory-card.html',
  styleUrls: ['./memory-card.css']
})
export class MemoryCard {
  public id = input<number>();
  public src = input<string>();
  public isFlipped = input<boolean>(false);
  public isResolved = input<boolean>(false);

  public cardSelected = output<void>();

  protected isCardVisible = computed(() => {
    return this.isFlipped() || this.isResolved();
  })


  protected flipCard() {
    if (this.isCardVisible()) return;

    this.cardSelected.emit()
  }
}
