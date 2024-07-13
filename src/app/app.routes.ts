import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardAdminComponent },
    { path: 'view', component: ViewProductComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'mycart', component: MyCartComponent },
    { path: 'checkout', component: CheckoutComponent },
];
