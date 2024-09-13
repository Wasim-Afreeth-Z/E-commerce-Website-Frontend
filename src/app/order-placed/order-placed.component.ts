import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './order-placed.component.html',
  styleUrl: './order-placed.component.scss'
})
export class OrderPlacedComponent {

}
