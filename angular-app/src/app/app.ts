import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustomToast} from '../toast/custom-toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomToast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App {
}
