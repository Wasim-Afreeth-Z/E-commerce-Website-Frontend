import { Component, inject, ViewChild } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { environment } from '../environment/environment';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-product-from-wishlist',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './view-product-from-wishlist.component.html',
  styleUrl: './view-product-from-wishlist.component.scss'
})
export class ViewProductFromWishlistComponent {
  WishlistService = inject(WishlistService)
  orderService = inject(OrderService)
  snackBar = inject(MatSnackBar)

  viewProduct: any | null = null;
  product_id: any | null = null;
  isLoading: boolean = false

  baseUrl = environment.BASEURL;
  userid: any = localStorage.getItem('userId')

  @ViewChild("header") headerdata!: HeaderComponent

  ngOnInit() {
    // console.log(history.state.product_id);
    this.product_id = history.state.product_id
    this.ViewProductFormWishlist()

  }

  ViewProductFormWishlist() {
    const request = {
      "user_id": this.userid,
      "product_id": this.product_id
    }
    this.WishlistService.ViewProductFormWishlist(request).subscribe({
      next: (data: any) => {
        // console.log(data);  
        this.viewProduct = data
        this.isLoading = true
      }
    })
  }

  addtoCart(viewProduct:any): void {
    if (viewProduct.stock === "Out of Stock") {
      this.snackBar.open('Product not Available', 'Out of Stock', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    } else {
      const request = {
        "product_id":viewProduct.product_id,
        "productname":  viewProduct.productname,
        "image": viewProduct.image,
        "description": viewProduct.description,
        "price": viewProduct.price,
        "stock": viewProduct.stock,
        "productcreater":viewProduct.productcreater,
        "user_id": this.userid,
        "quantity": viewProduct.quantity,
        "cat_id": viewProduct.cat_id
      }
      this.orderService.mycart(request).subscribe({
        next: (data: any) => {
          this.ViewProductFormWishlist()
          this.headerdata.count++
          this.snackBar.open('Product Add to Cart', 'MyCart', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
        error: (error: any) => {
          if (viewProduct.product_id == viewProduct.product_id) {
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

  // quantity increase and decrease
  plus(id: string): void {
    this.viewProduct.quantity++
    const request = {
      "id":id,
      "quantity": this.viewProduct.quantity
    }
    this.WishlistService.updateQuantityWishlist(request).subscribe({
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
    this.WishlistService.updateQuantityWishlist(request).subscribe({
      next: (res: any) => {

      }
    })
  }
}
