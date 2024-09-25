import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { WishlistService } from '../../services/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-delete-admin',
  standalone: true,
  imports: [],
  templateUrl: './delete-admin.component.html',
  styleUrl: './delete-admin.component.scss'
})
export class DeleteAdminComponent {

  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<DeleteAdminComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  authService = inject(AuthService)
  productService = inject(ProductService)
  orderService = inject(OrderService)
  saveforlaterService = inject(SaveForLaterService)
  wishlistService = inject(WishlistService)
  snackBar = inject(MatSnackBar)
  route = inject(Router)

  userid: any = localStorage.getItem('userId')

  // !delete the admin
  deleteAdmin() {

    // update stocks only
    const request = {
      "id": this.data.id,
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
      "id": this.data.id,
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
        this.authService.deleteAdmin(request).subscribe({
          next: (res) => {
            this.snackBar.open('Admin Deleted', 'Success', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000
            })
            this.dialogRef.close(true)
          }
        })
      }
    })
  }

  close() {
    this.dialogRef.close(true);
  }

}
