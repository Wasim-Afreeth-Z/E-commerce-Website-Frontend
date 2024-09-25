import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { WishlistService } from '../../services/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../services/super-admin.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  SuperAdminService = inject(SuperAdminService)
  userService = inject(UserService)
  productService = inject(ProductService)
  orderService = inject(OrderService)
  saveforlaterService = inject(SaveForLaterService)
  wishlistService = inject(WishlistService)
  snackBar = inject(MatSnackBar)
  route = inject(Router)

  userid: any = localStorage.getItem('userId')

  // !delete the user account 
  deleteUser() {
    const request = {
      "id": this.data.id
    }
    //Delete All Cart Product
    this.orderService.DeleteAllCartProduct(request).subscribe({
      next: (res) => {

      }
    })

    //Delete All the Save For Later Product
    this.saveforlaterService.DeleteAllSaveForLaterProduct(request).subscribe({
      next: (res) => {

      }
    })

    //Delete All the Wishlist Product
    this.wishlistService.DeleteAllWishlistProduct(request).subscribe({
      next: (res) => {

      }
    })


    //Delete user
    this.SuperAdminService.deleteUser(request).subscribe({
      next: (res) => {
        this.snackBar.open('User Deleted', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
        this.dialogRef.close(true)
      }
    })

  }

  close() {
    this.dialogRef.close(true);
  }

}
