import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-view-product-from-cart',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './view-product-from-cart.component.html',
  styleUrl: './view-product-from-cart.component.scss'
})
export class ViewProductFromCartComponent {
  orderService = inject(OrderService)

  viewProduct: any | null = null;
  product_id: any | null = null;
  isLoading: boolean = false

  baseUrl = environment.BASEURL;
  userid: any = localStorage.getItem('userId')

  ngOnInit() {
    // console.log(history.state.product_id);
    this.product_id = history.state.product_id
    this.ViewProductFormCart()
    
  }

  ViewProductFormCart() {
    const request ={
      "user_id": this.userid,
      "product_id": this.product_id 
    }
    this.orderService.ViewProductFormCart(request).subscribe({
      next: (data: any) => {
        // console.log(data);  
        this.viewProduct= data 
        this.isLoading = true
      }
    })
  }

   // quantity increase and decrease
   plus(id: string): void {
    this.viewProduct.quantity++
    const request = {
      "id":id,
      "quantity": this.viewProduct.quantity
    }
    this.orderService.updateQuantityCart( request).subscribe({
      next: (res: any) => {

      }
    })
  }

  minus(id: string): void {
    this.viewProduct.quantity--
    const request = {
      "id":id,
      "quantity": this.viewProduct.quantity
    }
    this.orderService.updateQuantityCart( request).subscribe({
      next: (res: any) => {

      }
    })
  }
}
