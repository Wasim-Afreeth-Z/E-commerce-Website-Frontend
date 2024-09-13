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
      "stock": "Out of Stock"
    }

    this.orderService.updateCartStockDeleteAccount(this.data.id, request).subscribe({
      next: (res: any) => {

      }
    })

    this.saveforlaterService.updateSaveForLaterStockDeleteAccount(this.data.id, request).subscribe({
      next: (res: any) => {

      }
    })

    this.wishlistService.updateWishlistStockDeleteAccount(this.data.id, request).subscribe({
      next: (res: any) => {

      }
    })
    //-------

    //update orderstatus CANCELLED in My Orders
    const request2 = {
      "orderstatus": "Cancelled"
    }
    this.orderService.updatestatusDeleteAccount(this.data.id, request2).subscribe({
      next: (res) => {

      }
    })

    //Delete All Product
    this.productService.DeleteAllProduct(this.data.id).subscribe({
      next: (res) => {
        //Delete Account
        this.authService.deleteAdmin(this.data.id).subscribe({
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
