import { Component, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule, PlatformLocation } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../services/wishlist.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  productService = inject(ProductService)
  orderService = inject(OrderService)
  wishlistService = inject(WishlistService)
  route = inject(Router)
  snackBar = inject(MatSnackBar)
  platformLocation = inject(PlatformLocation)

  cartProductCheck: any[] = []
  products: any[] = []
  categorylist: any[] = []
  categoryId: any = null
  isLoading: boolean = false

  p: number = 1;

  token: any = localStorage.getItem('token');
  userid: any = localStorage.getItem('userId')
  role: any = localStorage.getItem('role')

  baseUrl = environment.BASEURL;

  @ViewChild("header") headerdata!: HeaderComponent
  @ViewChild("footer") footerdata!: FooterComponent

  ngOnInit() {
    this.displayProducts()
    this.categoryList()

    history.pushState(null, '', location.href);
    this.platformLocation.onPopState(() => {
      history.pushState(null, '', location.href)
    })
  }

  // show data from database
  displayProducts() {
    const request = {
      "id": this.userid
    }
    this.productService.getProduct(request).subscribe({
      next: (res: any) => {
        
        //!added button feature in Angular
        // const products =res.data 
        // const request = {
        //   "id": this.userid
        // }
        // this.orderService.displaycart(request).subscribe({
        //   next: (data: any) => {
        //     for (let cart of data.data) {
        //       let index = products.findIndex((product: { product_id: any; }) => cart.product_id == product.product_id)
        //       if (index != -1) {
        //         products[index].isAdded = 1
        //       }
        //     }
        //   },
        // })
        this.products = res.data
        this.isLoading = true
      }
    })
  }

  // View Product
  viewProduct(product_id: any): void {
    this.route.navigate(['view'], { state: { product_id } });
  }

  // list the category
  categoryList() {
    this.productService.categoryList().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.categorylist = data.data
        this.isLoading = true

      }
    })
  }
  selectedButtonIndex: number | null = null;
  // filter by category
  filterCategory(id: string,index:number) {
    const request = {
      "id": id,
      "user_id":this.userid
    }
    this.productService.categoryFilter(request).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.selectedButtonIndex = index;
        this.categoryId = id
        this.products = data.data
        this.isLoading = true
      }
    })
  }

  // clear Filter
  clearCategoryFilter(): void {
    this.categoryId = null;
    this.displayProducts()
    this.isLoading = true
    this.selectedButtonIndex = null;
  }

  // !add to cart
  addtoCart(index: number, product: any): void {
    if (product.stock === "Out of Stock") {
      this.snackBar.open('Product not Available', 'Out of Stock', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    } else {
      const request = {
        "product_id": product.product_id,
        "productname": product.productname,
        "image": product.image,
        "description": product.description,
        "price": product.price,
        "stock": product.stock,
        "productcreater": product.productcreater,
        "user_id": this.userid,
        "quantity": product.quantity,
        "cat_id": product.cat_id
      }
      this.orderService.mycart(request).subscribe({
        next: (data: any) => {
          this.headerdata.count++
          this.displayProducts()
          this.snackBar.open('Product Add to Cart', 'MyCart', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
        error: (error: any) => {
          // if ( product.quantity < 10) {
          //   product.quantity++
          // }else{
          //   this.snackBar.open('Quantity is Full', 'MyCart', {
          //     horizontalPosition: 'center',
          //     verticalPosition: 'top',
          //     duration: 3000,
          //   });
          // }
          // const request = {
          //   "product_id": product.product_id,
          //   "user_id": this.userid,
          //   "quantity": product.quantity,
          // }
          // this.orderService.updateQuantityinhome(request).subscribe({
          //   next: (data: any) => {

          //   }
          // })

          if (product.product_id == product.product_id) {
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

  // !add to Wishlist
  addToWishlist(product: any): void {
    const request = {
      "product_id": product.product_id,
      "productname": product.productname,
      "image": product.image,
      "description": product.description,
      "price": product.price,
      "stock": product.stock,
      "productcreater": product.productcreater,
      "user_id": this.userid,
      "cat_id": product.cat_id,
      "quantity": product.quantity
    }
    this.wishlistService.myWishlist(request).subscribe({
      next: (data: any) => {
        this.displayProducts()
        this.snackBar.open('Product Add to Wishlist', 'My Wishlist', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
      error: (error: any) => {
        if (product.product_id == product.product_id) {
          this.snackBar.open('Already product in the Wishlist', 'My Wishlist', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      }
    })
  }

  // from header 
  searchFilter(): void {
    const request = {
      "id":this.userid,
      "input": this.headerdata.search!
    }
    this.productService.searchFilter(request).subscribe({
      next: (data: any) => {
        this.products = data.data
        this.isLoading = true
      }
    })
  }

  clearSearchFilter(): void {
    this.headerdata.search = null;
    this.displayProducts()
    this.isLoading = true
  }

  //from footer
  filterCategoryFooter() {
    const request = {
      "id": this.footerdata.categoryId!,
      "user_id":this.userid
    }
    this.productService.categoryFilter(request).subscribe({
      next: (data: any) => {
        this.products = data.data
        this.isLoading = true
      }
    })
  }

  clearCategoryFilterFooter(): void {
    this.footerdata.categoryId = null;
    this.displayProducts()
    this.isLoading = true
  }

}
