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
    const request1 = {
      "id": this.userid
    }
    //Delete All Cart Product
    this.orderService.DeleteAllCartProduct(request1).subscribe({
      next: (res) => {

      }
    })

    //Delete All the Save For Later Product
    this.saveforlaterService.DeleteAllSaveForLaterProduct(request1).subscribe({
      next: (res) => {

      }
    })

    //Delete All the Wishlist Product
    this.wishlistService.DeleteAllWishlistProduct(request1).subscribe({
      next: (res) => {

      }
    })

    // update stocks only
    const request = {
      "id":this.userid,
      "stock": "Out of Stock"
    }

    this.orderService.updateCartStockDeleteAccount(request).subscribe({
      next: (res: any) => {

      }
    })

    this.saveforlaterService.updateSaveForLaterStockDeleteAccount(request).subscribe({
      next: (res: any) => {

      }
    })

    this.wishlistService.updateWishlistStockDeleteAccount(request).subscribe({
      next: (res: any) => {

      }
    })
    //-------

    //update orderstatus CANCELLED in My Orders
    const request2 = {
      "id":this.userid,
      "orderstatus": "Cancelled"
    }
    this.orderService.updatestatusDeleteAccount(request2).subscribe({
      next: (res) => {

      }
    })

    //Delete All Product
    const request3 = {
      "id":this.userid,
    }
    this.productService.DeleteAllProduct(request3).subscribe({
      next: (res) => {
        //Delete Account
        const request = {
          "id": this.data.id
        }
        this.userService.deleteAccount(request).subscribe({
          next: (res) => {
            this.snackBar.open('Account Deleted', 'Success', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000
            })
            this.dialogRef.close(true)
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('userId')
            this.route.navigateByUrl('/home')
            this.userService.triggerHeaderFunction();
            // window.location.reload();
          }
        })
      }
    })

  }

  close() {
    this.dialogRef.close(true);
  }

}
