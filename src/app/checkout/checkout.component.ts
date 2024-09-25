import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FooterComponent } from '../footer/footer.component';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CheckoutComponent, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  addressForm!: FormGroup

  // inject
  formBuilder = inject(FormBuilder)
  route = inject(Router)
  orderService = inject(OrderService)
  snackBar = inject(MatSnackBar)

  carts: any[] = []
  myorderStorage: any[] = []
  cartCount: any | null = null
  isSubmitted: boolean = false
  isLoading: boolean = false

  baseUrl = environment.BASEURL;
  userid: any = localStorage.getItem('userId')
  date = Date.now()


  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      CustomerName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      pincode: [null, Validators.required],
      telephone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    })
    this.getcart()
  }

  //display the cart
  getcart(): void {
    const request = {
      "id": this.userid
    }
    this.orderService.displaycart(request).subscribe({
      next: (data: any) => {
        this.carts = data.data
        // console.log(this.carts);
        this.cartCount = this.carts.length
        localStorage.setItem('myorder', JSON.stringify(this.carts))
        this.isLoading = true
      },
    })
  }

  isSubmit(): void {
    this.isSubmitted = true
  }

  placeYourOrder() {
    // this.route.navigateByUrl('checkout')
    if (this.addressForm.value.CustomerName !== null,
      this.addressForm.value.email !== null,
      this.addressForm.value.address !== null,
      this.addressForm.value.city !== null,
      this.addressForm.value.state !== null,
      this.addressForm.value.pincode !== null,
      this.addressForm.value.telephone !== null
    ) {
      //! my Orders
      let currentDate = new Date().toJSON().slice(0, 10)
      let date = new Date();
      let deliverydate = new Date(date.setDate(date.getDate() + 7)).toJSON().slice(0, 10);

      this.myorderStorage = JSON.parse(localStorage.getItem('myorder')!) || []
      this.myorderStorage.forEach((element, index, array) => {
        const request = {
          "product_id": element.product_id,
          "productname": element.productname,
          "image": element.image,
          "description": element.description,
          "price": element.price,
          "stock": element.stock,
          "productcreater": element.productcreater,
          "user_id": this.userid,
          "quantity": element.quantity,
          "ordereddate": currentDate,
          "deliverydate": deliverydate,
          "orderstatus": "In Process",
          "CustomerName": this.addressForm.value.CustomerName,
          "email": this.addressForm.value.email,
          "address": this.addressForm.value.address,
          "city": this.addressForm.value.city,
          "state": this.addressForm.value.state,
          "pincode": this.addressForm.value.pincode,
          "telephone": this.addressForm.value.telephone,
        }
        // console.log(request2);
        this.orderService.myOrder(request).subscribe({
          next: (data: any) => {
            // Clear Cart
            const request = {
              "id": this.userid
            }
            this.orderService.ClearCart(request).subscribe({
              next: (res) => {
              }
            })
            localStorage.removeItem('myorder')
            this.route.navigateByUrl('orderplaced')
            this.snackBar.open('Order was Placed', 'Success', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        })
      })
    } else {
      this.snackBar.open('Fill the Address Fields', 'Failed', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
  }

  placeYourOrderAndSubmit() {
    this.placeYourOrder()
    this.isSubmit()
  }

  cancelYourOrder() {
    this.snackBar.open('Order Was Cancel', 'Cancelled', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
    localStorage.removeItem('myorder')
    this.route.navigateByUrl('mycart')
  }

  // !calculation
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
