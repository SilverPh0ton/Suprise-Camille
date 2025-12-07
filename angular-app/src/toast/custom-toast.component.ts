import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'custom-toast',
  imports: [
    Button,
    RouterLink,
    Toast
  ],
  templateUrl: './custom-toast.component.html'
})
export class CustomToast {

}
