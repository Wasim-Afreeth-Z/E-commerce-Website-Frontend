import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,  NgxPaginationModule],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.scss'
})
export class MyordersComponent {

  orderService = inject(OrderService)
  route = inject(Router)

  myorders: any[] = []
  isLoading: boolean = false

  p: number = 1;

  userid: any = localStorage.getItem('userId')

  baseUrl = environment.BASEURL;

  ngOnInit() {
    this.getMyOrders()
  }

  //display my orders
  getMyOrders(): void {
    const request = {
      "id": this.userid
    }
    this.orderService.displayMyOrders(request).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.myorders = data.data
        this.isLoading = true
      },
    })
  }


   // calculation
   eachProductPrice(order: any) {
    return order.price * order.quantity
  }

  total(order:any) {
    const eachProductPrice = order.price * order.quantity
    const tax = eachProductPrice * 0.18
    return eachProductPrice + tax
  }

  invoice(order:any): void {
    this.route.navigate(['customerinvoice'], { state: { orders: order } });
  }


}
