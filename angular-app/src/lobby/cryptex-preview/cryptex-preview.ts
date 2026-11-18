import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ProgressStore} from '../progress.state';

@Component({
  selector: 'cryptex-preview',
  imports: [
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './cryptex-preview.html'
})
export class CryptexPreview {
  protected progressStore = inject(ProgressStore);
}
