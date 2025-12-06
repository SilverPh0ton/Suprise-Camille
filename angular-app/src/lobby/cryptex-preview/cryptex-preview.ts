import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ProgressStore} from '../progress.state';

@Component({
  selector: 'cryptex-preview',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cryptex-preview.html'
})
export class CryptexPreview {
  protected progressStore = inject(ProgressStore);
}
