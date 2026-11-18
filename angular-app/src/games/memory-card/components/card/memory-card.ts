import {Component, computed, input, output, ChangeDetectionStrategy} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'memory-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './memory-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./memory-card.css']
})
export class MemoryCard {
  public id = input.required<number>();
  public src = input.required<string>();
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
