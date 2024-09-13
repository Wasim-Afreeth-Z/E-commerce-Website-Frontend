import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MyAccountComponent } from '../my-account/my-account.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dialog = inject(MatDialog)
  userService = inject(UserService)
  orderService= inject(OrderService)
  productService = inject(ProductService)
  route=inject(Router)
  
  carts: any[] = []
  @Input() count: any | null = null

  @Input() search: string | null = null
  @Output() searchFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearSearchFilter: EventEmitter<any> = new EventEmitter<any>();

  token: any = localStorage.getItem('token');
  userid: any = localStorage.getItem('userId')
  role: any = localStorage.getItem('role')

  ngOnInit():void{
    this.getcart()
  }

  menuIcon: string = "fa fa-bars"
  menuValue: boolean = true;
  
  openSidebar() {
    this.menuValue = !this.menuValue
    this.menuIcon = !this.menuValue ? "fa fa-close" : "fa fa-bars";
  }

  // open my account
  openMyAccountDialog() {
    this.userService.getuser(this.userid).subscribe({
      next: (data: any) => {
        const userDetail = data
        const dialog = this.dialog.open(MyAccountComponent, {
          width: '600px',
          height: '93%',
          data: { userDetail }
        })
      }
    })
  }

  //display the cart
  getcart(): void {
    this.orderService.displaycart(this.userid).subscribe({
      next: (data: any) => {
        this.carts = data.data
        this.count = this.carts.length
        // console.log(this.carts);
      },
    })
  }

  // search filter home component
  searchFilterbutton(): void {
    // this.route.navigateByUrl('home');
    this.searchFilter.emit()
  }

  searchFilterbuttonEvent(event: Event): void {
    this.search = (event.target as HTMLInputElement).value
    this.searchFilter.emit(this.search)
  }

  clearSearchFilterbutton(): void {
    this.clearSearchFilter.emit()
  }
}
