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
  imports: [CommonModule, RouterLink, FormsModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dialog = inject(MatDialog)
  userService = inject(UserService)
  orderService = inject(OrderService)
  productService = inject(ProductService)
  route = inject(Router)

  carts: any[] = []
  @Input() count: any | null = null

  @Input() search: string | null = null
  @Output() searchFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearSearchFilter: EventEmitter<any> = new EventEmitter<any>();

  token = localStorage.getItem('token');
  userid = localStorage.getItem('userId');
  role = localStorage.getItem('role')

  ngOnInit(): void {
    this.getcart()
    // Subscribe to the observable and call the function when the signal is triggered
    this.userService.headerFunction$.subscribe(() => {
      this.Cleartoken();
    });

  }

  menuIcon: string = "fa fa-bars"
  menuValue: boolean = true;

  openSidebar() {
    this.menuValue = !this.menuValue
    this.menuIcon = !this.menuValue ? "fa fa-close" : "fa fa-bars";
  }

  Cleartoken() {
    this.token = null;
    this.userid = null;
    this.role = null;
  }

  // open my account
  openMyAccountDialog() {
    const request = {
      "id": this.userid
    }
    this.userService.getuser(request).subscribe({
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
    const request = {
      "id": this.userid
    }
    this.orderService.displaycart(request).subscribe({
      next: (data: any) => {
        this.carts = data.data
        this.count = this.carts.length
        // console.log(data);
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
