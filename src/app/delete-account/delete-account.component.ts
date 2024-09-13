import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss'
})
export class DeleteAccountComponent {
  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<DeleteAccountComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  userService = inject(UserService)
  productService = inject(ProductService)
  orderService = inject(OrderService)
  saveforlaterService = inject(SaveForLaterService)
  wishlistService = inject(WishlistService)
  snackBar = inject(MatSnackBar)
  route = inject(Router)

  userid: any = localStorage.getItem('userId')

  // !delete the user account 
  deleteAccount() {

    //Delete All Cart Product
    this.orderService.DeleteAllCartProduct(this.userid).subscribe({
      next: (res) => {

      }
    })

    //Delete All the Save For Later Product
    this.saveforlaterService.DeleteAllSaveForLaterProduct(this.userid).subscribe({
      next: (res) => {

      }
    })

    //Delete All the Wishlist Product
    this.wishlistService.DeleteAllWishlistProduct(this.userid).subscribe({
      next: (res) => {

      }
    })

    // update stocks only
    const request = {
      "stock": "Out of Stock"
    }

    this.orderService.updateCartStockDeleteAccount(this.userid, request).subscribe({
      next: (res: any) => {

      }
    })

    this.saveforlaterService.updateSaveForLaterStockDeleteAccount(this.userid, request).subscribe({
      next: (res: any) => {

      }
    })

    this.wishlistService.updateWishlistStockDeleteAccount(this.userid, request).subscribe({
      next: (res: any) => {

      }
    })
    //-------

    //update orderstatus CANCELLED in My Orders
    const request2 = {
      "orderstatus": "Cancelled"
    }
    this.orderService.updatestatusDeleteAccount(this.userid, request2).subscribe({
      next: (res) => {

      }
    })

    //Delete All Product
    this.productService.DeleteAllProduct(this.userid).subscribe({
      next: (res) => {
        //Delete Account
        this.userService.deleteAccount(this.data.id).subscribe({
          next: (res) => {
            this.snackBar.open('Account Deleted', 'Success', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000
            })
            this.dialogRef.close(true)
            window.location.reload();
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('userId')
            this.route.navigateByUrl('/home')
            window.location.reload();
          }
        })
      }
    })

  }

  close() {
    this.dialogRef.close(true);
  }

}
