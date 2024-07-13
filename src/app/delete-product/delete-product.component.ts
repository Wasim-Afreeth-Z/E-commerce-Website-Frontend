import { Component, Inject, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  snackBar = inject(MatSnackBar)

  // delete the data from service file
  deleteProduct() {
    this.productService.deleteProduct(this.data.id).subscribe({
      next: (res) => {
        this.snackBar.open('Product Deleted', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
        this.dialogRef.close(true)
      }
    })
  }

  close(){
    this.dialogRef.close(true);
 }
}
