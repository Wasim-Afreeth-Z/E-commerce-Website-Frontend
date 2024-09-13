import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { OrderService } from '../../services/order.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Observable, switchMap } from 'rxjs';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [HeaderComponent, RouterLink, CommonModule, FooterComponent],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss'
})
export class MyCartComponent {

  orderService = inject(OrderService)
  saveforlaterService = inject(SaveForLaterService)
  route = inject(Router)
  snackBar = inject(MatSnackBar)


  carts: any[] = []
  cartsOutofStock: any[] = []
  cartProductCheck: any[] = []
  cartCount: any | null = null
  SaveForLater: any[] = []
  SaveForLaterCount: any | null = null
  isLoading: boolean = false


  userid: any = localStorage.getItem('userId')

  baseUrl = environment.BASEURL;


  ngOnInit() {
    this.getcart()
    this.getcartOutofStock()
    this.getSaveForLater()
    //this.carts= JSON.parse(localStorage.getItem('productId')!) || []
  }

  //display the cart
  getcart(): void {
    this.orderService.displaycart(this.userid).subscribe({
      next: (data: any) => {
        // console.log(data);
        
        this.carts = data.data
        this.cartCount = this.carts.length
        // console.log(this.carts);
        this.isLoading = true
      },
    })
  }

  //display the cart Out of Stock
  getcartOutofStock(): void {
    this.orderService.displaycartOutofStock(this.userid).subscribe({
      next: (data: any) => {
        this.cartsOutofStock = data.data
        // console.log(this.cartsOutofStock);
        this.isLoading = true
      },
    })
  }

  //display the SaveForLater
  getSaveForLater(): void {
    this.saveforlaterService.displaySaveForLater(this.userid).subscribe({
      next: (data: any) => {
        this.SaveForLater = data.data
        this.SaveForLaterCount = this.SaveForLater.length
        // console.log(this.SaveForLater);
        this.isLoading = true
      },
    })
  }

  // quantity increase and decrease
  plus(index: number, id: string): void {
    this.carts[index].quantity++
    const request = {
      "quantity": this.carts[index].quantity
    }
    this.orderService.updateQuantityCart(id, request).subscribe({
      next: (res: any) => {

      }
    })
  }

  minus(index: number, id: string): void {
    this.carts[index].quantity--
    const request = {
      "quantity": this.carts[index].quantity
    }
    this.orderService.updateQuantityCart(id, request).subscribe({
      next: (res: any) => {

      }
    })
  }

  // delete the cart
  deleteCart(index: number, id: string) {
    this.orderService.deleteCart(id).subscribe({
      next: (res) => {
        this.getcart()
        this.getcartOutofStock()
        this.getSaveForLater()
        // this.carts.splice(index, 1)
        this.cartCount
        // localStorage.setItem('productId', JSON.stringify(this.carts))
        this.isLoading = true
      }
    })
  }

  // Clear Cart
  ClearCart(): void {
    this.orderService.ClearCart(this.userid).subscribe({
      next: (res) => {
        this.getcart()
        this.getSaveForLater()
        this.snackBar.open('Cart Cleared', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.isLoading = true
      }
    })
  }

  // View Product from cart
  viewProductFromCart(product_id: any): void {
    this.route.navigate(['viewfromcart'], { state: { product_id } });
  }

  // View Product From Save For Later
  viewProductFromSaveForLater(product_id: any): void {
    this.route.navigate(['viewfromSaveForLater'], { state: { product_id } });
  }

  // !add to saveforlater
  addToSaveForLater(cart: any, index: number): void {
    console.log(cart);
    
    const request = {
      "product_id": cart.product_id,
      "productname": cart.productname,
      "image": cart.image,
      "description": cart.description,
      "price": cart.price,
      "stock": cart.stock,
      "productcreater": cart.productcreater,
      "user_id": this.userid,
      "quantity": cart.quantity,
      "cat_id": cart.cat_id
    }
    this.saveforlaterService.SaveForLater(request).subscribe({
      next: (data: any) => {
        //delete cart after add save for later
        this.orderService.deleteCart(cart.id).subscribe({
          next: (res) => {
            this.carts.splice(index, 1)
            this.cartCount--
          }
        })
        this.getSaveForLater()
        this.getcart()
        this.getcartOutofStock()
        this.snackBar.open('Product Add to Save For Later', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.isLoading = true
      },
      error: (error: any) => {
        if (cart.product_id == cart.product_id) {
          this.snackBar.open('Already product in the Save For Later', '!!!', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      }
    })
  }

  // !Move to cart
  MovetoCart(product: any, index: number): void {
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
        //delete save for later after add cart
        this.saveforlaterService.deleteSaveForLater(product.id).subscribe({
          next: (res) => {
            this.SaveForLater.splice(index, 1)
            this.SaveForLaterCount--

          }
        })
        this.getcart()
        this.snackBar.open('Product Move to Cart', 'MyCart', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.isLoading = true
      },
      error: (error: any) => {
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

  // delete the Save For Later
  deleteSaveForLater(index: number, id: string) {
    this.saveforlaterService.deleteSaveForLater(id).subscribe({
      next: (res) => {
        this.SaveForLater.splice(index, 1)
        this.SaveForLaterCount--
        this.isLoading = true
      }
    })
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
