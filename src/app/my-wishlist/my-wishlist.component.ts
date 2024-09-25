import { Component, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../services/wishlist.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-my-wishlist',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, NgxPaginationModule],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.scss'
})
export class MyWishlistComponent {
  wishlistService = inject(WishlistService)
  orderService = inject(OrderService)
  route = inject(Router)
  snackBar = inject(MatSnackBar)

  wishlists: any[] = []
  wishlistCount: any | null = null
  isLoading: boolean = false

  p: number = 1;

  userid: any = localStorage.getItem('userId')

  baseUrl = environment.BASEURL;

  @ViewChild("header") headerdata!: HeaderComponent

  ngOnInit() {
    this.getWishlist()
  }

  //display the Wishlist
  getWishlist(): void {
    const request={
      "id":this.userid
    }
    this.wishlistService.displaywishlist(request).subscribe({
      next: (data: any) => {
        this.wishlists = data.data
        this.wishlistCount = this.wishlists.length
        // console.log(this.wishlists);
        this.isLoading = true
      },
    })
  }

  // !add to cart
  addtoCart(wishlist: any): void {
    if (wishlist.stock === "Out of Stock") {
      this.snackBar.open('Product not Available', 'Out of Stock', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    } else {
      const request = {
        "product_id": wishlist.product_id,
        "productname":  wishlist.productname,
        "image": wishlist.image,
        "description": wishlist.description,
        "price": wishlist.price,
        "stock": wishlist.stock,
        "productcreater":wishlist.productcreater,
        "user_id": this.userid,
        "quantity": wishlist.quantity,
        "cat_id": wishlist.cat_id
      }
      this.orderService.mycart(request).subscribe({
        next: (data: any) => {
          this.headerdata.count++
          this.getWishlist()
          this.snackBar.open('Product Add to Cart', 'MyCart', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
        error: (error: any) => {
          if (wishlist.product_id == wishlist.product_id) {
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

  // delete the Wishlist
  deleteWishlist(index: number, id: string) {
    this.wishlists.splice(index, 1)
    this.wishlistCount--
    const request={
      "id":id
    }
    this.wishlistService.deleteWishlist(request).subscribe({
      next: (res) => {
        // if (this.wishlists.length=8) {
        //   // this.route.navigateByUrl('wishlist')
          
        //   window.location.reload();
        // }
        this.isLoading = true
      }
    })
  }

  // View Product
  viewProduct(product_id: any): void {
    this.route.navigate(['viewfromwishlist'], { state: { product_id } });
  }
}
