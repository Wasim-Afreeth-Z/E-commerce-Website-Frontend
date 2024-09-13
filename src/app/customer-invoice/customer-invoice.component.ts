import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-invoice.component.html',
  styleUrl: './customer-invoice.component.scss'
})
export class CustomerInvoiceComponent {
  route = inject(Router)
  orderService = inject(OrderService)

  invoice: any | null = null;
  // address: any[] = []

  ngOnInit(): void {
    // console.log(history.state);
    this.invoice = history.state.orders
    // console.log(this.invoice);
  }

  //calculation
  subTotal(invoice: any) {
    return invoice.price * invoice.quantity
  }

  tax(invoice: any) {
    const subTotal = invoice.price * invoice.quantity
    return subTotal * 0.18
  }
  total(invoice: any) {
    const subTotal = invoice.price * invoice.quantity
    const tax = subTotal * 0.18
    return subTotal + tax
  }

  back(): void {
    this.route.navigateByUrl('myorder')
  }

}
