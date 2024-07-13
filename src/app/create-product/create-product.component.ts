import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  productCreate!: FormGroup

  // inject
  formBuilder = inject(FormBuilder)
  snackBar = inject(MatSnackBar)
  productService = inject(ProductService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  categorylist: any[] = []

  userid: any = localStorage.getItem('userId')

  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<CreateProductComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  ngOnInit() {
    this.productCreate = this.formBuilder.group({
      productname: [null, Validators.required],
      image: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      cat_id: [null, Validators.required],
      stock: [null, Validators.required]
    })
    this.categoryList()
    // console.log(this.data);
    
  }

  // send the data to service file
  CreateProduct(): void {
    const request = {
      "productname": this.productCreate.value.productname,
      "image": this.productCreate.value.image,
      "description": this.productCreate.value.description,
      "price": this.productCreate.value.price,
      "cat_id": this.productCreate.value.cat_id,
      "stock": this.productCreate.value.stock,
      "user_id": this.userid,
    }
      this.productService.CreateProduct(request).subscribe({
        next: (data: any) => {
          this.snackBar.open('Product Created ', 'Success', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000
          })
          this.dialogRef.close(true)
        },
        error: (error: any) => {
          if (this.productCreate.value.email === this.productCreate.value.email || this.productCreate.value.username === this.productCreate.value.username) {
            this.snackBar.open('Product Name already exists', 'Error', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
          } else {
            this.snackBar.open('Failed', 'Error', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        }
      })
  }

  // update the data from service file
  updateProduct() {
      this.productService.updateProduct(this.data?.product.id, this.productCreate.value).subscribe({
        next: (res: any) => {
          this.snackBar.open('Product Detail Updated', 'Success', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
          this.dialogRef.close(true)
        },
        error: (error: any) => {
          if (this.productCreate.value.email === this.productCreate.value.email || this.productCreate.value.username === this.productCreate.value.username) {
            this.snackBar.open('Product Name already exists', 'Error', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
          } else {
            this.snackBar.open('Failed', 'Error', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        }
      })
  }

  isSubmitted: boolean = false
  isEdit: boolean = false

  isSubmit(): void {
    this.isSubmitted = true
  }

  CreateOrUpdate() {
    if (this.isEdit) {
      this.updateProduct()
    } else {
      this.CreateProduct()
      this.isSubmit()
    }
  }

  ngAfterViewInit() {
    if (this.data !== null) {
      this.isEdit = true
      this.productCreate.patchValue(this.data?.product)
      this.cdr.detectChanges()
    }
  }

  // list the category
  categoryList() {
    this.productService.categoryList().subscribe({
      next: (data: any) => {
        this.categorylist = data.data

      }
    })
  }
}
