import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {

  snackBar = inject(MatSnackBar)
  orderService = inject(OrderService)

  carts: any[] = []
  viewProduct: any | null = null;

  userid: any = localStorage.getItem('userId')

  ngOnInit() {
    // console.log(history.state.products);
    this.viewProduct = history.state.products
  }

  addtoCart(product_id: string, stock: any): void {
    if (stock === "Out of Stock") {
      this.snackBar.open('Product not Available', 'Out of Stock', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    } else {
      const request = {
        "product_id": product_id,
        "user_id": this.userid,
        "quantity": 1
      }
      this.orderService.mycart(request).subscribe({
        next: (data: any) => {
          this.snackBar.open('Product Add to Cart', 'MyCart', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
        error: (error: any) => {
          if (product_id == product_id) {
            this.snackBar.open('Already product in the Cart', 'MyCart', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        }
      })
    }
  }

}
