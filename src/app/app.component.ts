import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,HeaderComponent,DashboardAdminComponent,ViewProductComponent,LoginComponent,SignUpComponent,CreateProductComponent,MyAccountComponent,MyCartComponent,CheckoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-Commerce-Website-Frontend';
}
