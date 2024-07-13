import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { OrderService } from '../../services/order.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [HeaderComponent, RouterLink,CommonModule,FooterComponent],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss'
})
export class MyCartComponent {

  orderService = inject(OrderService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  route = inject(Router)

  carts: any[] = []
  cartCount: any | null = null

  userid: any = localStorage.getItem('userId')

  ngOnInit() {
    this.getcart()
    this.cartCount
  }

  //display the cart
  getcart(): void {
    this.orderService.displaycart(this.userid).subscribe({
      next: (data: any) => {
        this.carts = data.data
        this.cartCount = this.carts.length
      },
    })
  }

  // quantity increase and decrease
  plus(index: number, id: string): void {
    this.carts[index].quantity++
    const request = {
      "quantity": this.carts[index].quantity
    }
    this.orderService.updateQuantity(id, request).subscribe({
      next: (res: any) => {

      }
    })
  }

  minus(index: number, id: string): void {
    this.carts[index].quantity--
    const request = {
      "quantity": this.carts[index].quantity
    }
    this.orderService.updateQuantity(id, request).subscribe({
      next: (res: any) => {

      }
    })
  }

  // delete the cart
  deleteCart(index: number, id: string) {
    this.carts.splice(index, 1)
    this.orderService.deleteCart(id).subscribe({
      next: (res) => {

      }
    })
  }

  // View Product
  viewProduct(product: any): void {
    this.route.navigate(['view'], { state: { products: product } });
  }

  // calculation
  eachProductPrice(cart: any) {
    return cart.price * cart.quantity
  }

  subTotal() {
    return this.carts.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0)
  }

  tax() {
    return this.subTotal() * 0.18
  }

  total() {
    return this.subTotal() + this.tax()
  }




}
