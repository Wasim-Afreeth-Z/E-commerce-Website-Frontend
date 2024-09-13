import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { AdminInvoiceComponent } from './admin-invoice/admin-invoice.component';
import { ViewProductFromCartComponent } from './view-product-from-cart/view-product-from-cart.component';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';
import { ViewProductFromSaveForLaterComponent } from './view-product-from-save-for-later/view-product-from-save-for-later.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { canActiveGuard } from './guard/can-active.guard';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { DashboardSuperAdminComponent } from './dashboard-super-admin/dashboard-super-admin.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { ViewProductFromWishlistComponent } from './view-product-from-wishlist/view-product-from-wishlist.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'dashboard', component: DashboardAdminComponent },
    { path: 'view', component: ViewProductComponent },
    { path: 'viewfromcart', component: ViewProductFromCartComponent },
    { path: 'viewfromSaveForLater', component: ViewProductFromSaveForLaterComponent },
    { path: 'viewfromwishlist', component: ViewProductFromWishlistComponent },
    { path: 'mycart', component: MyCartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'myorder', component: MyordersComponent },
    { path: 'ordermanage', component: OrderManagementComponent },
    { path: 'admininvoice', component: AdminInvoiceComponent },
    { path: 'customerinvoice', component: CustomerInvoiceComponent },
    { path: 'wishlist', component: MyWishlistComponent },
    { path: 'orderplaced', component: OrderPlacedComponent },
    { path: 'dashboard-super-admin', component: DashboardSuperAdminComponent },
    { path: 'admin-manage', component: AdminManageComponent },
    { path: 'user-manage', component: UserManageComponent },
];

// , canActivate: [canActiveGuard]