import { Component, inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-view-product-from-save-for-later',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './view-product-from-save-for-later.component.html',
  styleUrl: './view-product-from-save-for-later.component.scss'
})
export class ViewProductFromSaveForLaterComponent {

  snackBar = inject(MatSnackBar)
  orderService = inject(OrderService)
  saveforlaterService = inject(SaveForLaterService)

  viewProduct: any | null = null;
  product_id: any | null = null;
  isLoading: boolean = false

  userid: any = localStorage.getItem('userId')

  baseUrl = environment.BASEURL;

  @ViewChild("header") headerdata!: HeaderComponent

  ngOnInit() {
    // console.log(history.state.product_id);
    this.product_id = history.state.product_id
    this.ViewProductFormSaveForLater()

  }

  ViewProductFormSaveForLater() {
    const request = {
      "user_id": this.userid,
      "product_id": this.product_id
    }
    this.saveforlaterService.ViewProductFormSaveForLater(request).subscribe({
      next: (data: any) => {
        console.log(data);  
        this.viewProduct = data
        this.isLoading = true
      }
    })
  }

  MovetoCart(viewProduct:any): void {
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
          this.ViewProductFormSaveForLater()
          this.headerdata.count++

          //delete save for later after add cart
          const request = {
            "id":viewProduct.id,
          }
        this.saveforlaterService.deleteSaveForLater(request).subscribe({
          next: (res) => {
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
    this.saveforlaterService.updateQuantitySaveForLater(request).subscribe({
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
    this.saveforlaterService.updateQuantitySaveForLater(request).subscribe({
      next: (res: any) => {

      }
    })
  }
}
