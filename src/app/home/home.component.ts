import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  productService = inject(ProductService)
  orderService = inject(OrderService)
  route = inject(Router)
  snackBar = inject(MatSnackBar)

  // carts: any | null = null
  products: any[] = []
  categorylist: any[] = []
  categoryId: any = null

  userid: any = localStorage.getItem('userId')

  ngOnInit() {
    this.displayProducts()
    this.categoryList()
    // this.getcart()
  }

  // show data from database
  displayProducts() {
    this.productService.getProduct().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.products = data.data
      }
    })
  }

  // View Product
  viewProduct(product: any): void {
    this.route.navigate(['view'], { state: { products: product } });
  }

  // list the category
  categoryList() {
    this.productService.categoryList().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.categorylist = data.data

      }
    })
  }

  // filter by category
  filterCategory(id: string) {
    this.productService.categoryFilter(id).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.categoryId = id
        this.products = data.data
      }
    })
  }

  // clear Filter
  clearCategoryFilter(): void {
    this.categoryId = null;
    this.displayProducts()
  }

  // !add to cart
  addtoCart(product_id: string, stock: any): void {
    if (stock==="Out of Stock") {
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

  // getcart(): void {
  //   this.orderService.getcart().subscribe({
  //     next: (data: any) => {
  //       // console.log(data);
  //       this.carts = data.data
       
  //       // console.log(this.carts);

  //     },

  //   })
  // }




}
