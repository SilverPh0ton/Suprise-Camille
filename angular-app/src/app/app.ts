import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustomToast} from '../toast/custom-toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomToast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
