import { Component, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../environment/environment';

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
  productService = inject(ProductService)

  viewProduct: any | null = null;
  product_id: any | null = null;
  isLoading: boolean = false

  token: any = localStorage.getItem('token');
  userid: any = localStorage.getItem('userId')
  role: any = localStorage.getItem('role')

  baseUrl = environment.BASEURL;

  @ViewChild("header") headerdata!: HeaderComponent

  ngOnInit() {
    console.log(history.state.product_id);
    this.product_id = history.state.product_id
    this.ViewProduct()
    
  }

  ViewProduct() {
    const request ={
      "user_id":this.userid,
      "product_id": this.product_id 
    }
    this.productService.ViewProduct(request).subscribe({
      next: (data: any) => {
        // console.log(data);  
        this.viewProduct= data 
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
          this.ViewProduct()
          this.headerdata.count++
          const request = {
            "id":viewProduct.product_id,
            "quantity": 1
          }
          this. productService.updateQuantityProduct(request).subscribe({
            next: (res: any) => {
      
            }
          })
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
    this. productService.updateQuantityProduct(request).subscribe({
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
    this. productService.updateQuantityProduct(request).subscribe({
      next: (res: any) => {

      }
    })
  }

}
