import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-invoice.component.html',
  styleUrl: './admin-invoice.component.scss'
})
export class AdminInvoiceComponent {
  route = inject(Router)
  snackBar = inject(MatSnackBar)
  orderService = inject(OrderService)

  invoice: any | null = null;

  ngOnInit(): void {
    // console.log(history.state);
    this.invoice = history.state.orders
    // console.log(this.invoice);
  }

  //calculation
  subTotal(invoice: any) {
   return invoice.price * invoice.quantity
  }

  tax(invoice:any) {
    const subTotal = invoice.price * invoice.quantity
    return subTotal * 0.18
  }
  total(invoice:any) {
    const subTotal = invoice.price * invoice.quantity
    const tax = subTotal * 0.18
    return subTotal + tax
  }

  back(): void {
    this.route.navigateByUrl('ordermanage')
  }

  printRecipt():void{
    // localStorage.removeItem('invoice')
    this.route.navigateByUrl('ordermanage')
    this.snackBar.open('Recipt is Printing', 'Success', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })
  }

}
