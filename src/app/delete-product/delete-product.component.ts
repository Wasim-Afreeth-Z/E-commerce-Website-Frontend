import { Component, Inject, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {

  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<DeleteProductComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  productService = inject(ProductService)
  orderService = inject(OrderService)
  saveforlaterService = inject(SaveForLaterService)
  wishlistService = inject(WishlistService)
  snackBar = inject(MatSnackBar)

  // delete the data from service file
  deleteProduct() {
    // update stocks only
    const request = {
      "id":this.data?.id,
      "stock": "Out of Stock"
    }

    this.orderService.updateCartStock( request).subscribe({
      next: (res: any) => {

      }
    })

    this.saveforlaterService.updateSaveForLaterStock(request).subscribe({
      next: (res: any) => {

      }
    })

    this.wishlistService.updateWishlistStock(request).subscribe({
      next: (res: any) => {

      }
    })
    //-------
    const request2 = {
      "id":this.data.id,
    }
    this.productService.deleteProduct(request2).subscribe({
      next: (res) => {
        this.snackBar.open(`${res.message}`, `${res.smallmessage}`, {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
        this.dialogRef.close(true)
      },
    })
  }

  close() {
    this.dialogRef.close(true);
  }
  
}
