import { Component, inject, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateOrderDetailsComponent } from '../update-order-details/update-order-details.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss'
})
export class OrderManagementComponent {

  dialog = inject(MatDialog)
  orderService = inject(OrderService)
  route = inject(Router)

  isLoading: boolean = false

  orders: any[] = []
  displayedColumns: string[] = ['orderid', 'productdetail', 'quantity', 'ordereddate', 'deliverydate','invoicebill','status', 'action'];
  dataSource: any;

  userid: any = localStorage.getItem('userId')

  baseUrl = environment.BASEURL;

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit() {
    this.getMyOrdersInDashboard()
  }

  //display the cart
  getMyOrdersInDashboard(): void {
    const request = {
      "id": this.userid
    }
    this.orderService.displayMyOrdersdashboard(request).subscribe({
      next: (data: any) => {
        this.orders = data.data
        // console.log(this.orders);
        this.dataSource = data.data
        this.dataSource = new MatTableDataSource<any>(data.data)
        this.dataSource.paginator = this.paginator;
        this.isLoading = true
      },
    })
  }

  back(): void {
    this.route.navigateByUrl('dashboard')
  }

  invoice(order: any): void {
    this.route.navigate(['admininvoice'], { state: { orders: order } });
  }

  // update the data 
  openOrderDetailsDialog(order: any) {
    const dialog = this.dialog.open(UpdateOrderDetailsComponent, {
      width: '600px',
      height: '40%',
      data: { order }
    })
    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res)
          this.getMyOrdersInDashboard()
      }
    })
  }

}
