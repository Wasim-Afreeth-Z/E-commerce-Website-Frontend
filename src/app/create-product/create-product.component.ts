import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../environment/environment';
import { Productcreateform } from './form.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatDialogModule, MatSnackBarModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  productCreate!: FormGroup

  // inject
  formBuilder = inject(FormBuilder)
  snackBar = inject(MatSnackBar)
  productService = inject(ProductService)
  authService = inject(AuthService)
  orderService = inject(OrderService)
  saveforlaterService = inject(SaveForLaterService)
  wishlistService = inject(WishlistService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  categorylist: any[] = []

  userid: any = localStorage.getItem('userId')
  baseUrl = environment.BASEURL;
  isLoading: boolean = false


  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<CreateProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any = null) { }

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
  }
  formData!: FormData
  image?: File;

  FileSelected(event: any) {
    const file = event.target.files[0];
    this.image = file
  }

  // send the data to service file
  CreateProduct(): void {
    this.isLoading = true
    this.formData = new FormData()
    this.formData.append('product-image', this.image!);
    // console.log(this.image);

    this.authService.ProductImageUpload(this.formData).subscribe({
      next: (data: any) => {  
        console.log(data);
        
        this.isLoading = false
        let currentDate = new Date().toJSON().slice(0, 10)
        let currenttime = new Date().toLocaleTimeString()
        const request = {
          "productname": this.productCreate.value.productname,
          "image": data.data.url,
          "description": this.productCreate.value.description,
          "price": this.productCreate.value.price,
          "cat_id": this.productCreate.value.cat_id,
          "stock": this.productCreate.value.stock,
          "user_id": this.userid,
          "quantity": 1,
          "created_date": currentDate,
          "created_time": currenttime
        }
        // { data: this.authService.encryptData(request) }
        this.productService.CreateProduct(request).subscribe({
          next: (data: any) => {
            this.snackBar.open('Product Created ', 'Success', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000
            })
            this.dialogRef.close(true)
            this.isLoading = false
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
    })
  }

  // update the data from service file
  updateProduct() {
    this.isLoading = true
    if (this.productCreate.value.image === null) {
      const request = {
        "id":this.data?.product_id,
        "productname": this.productCreate.value.productname,
        "image": this.data.product_image,
        "description": this.productCreate.value.description,
        "cat_id": this.productCreate.value.cat_id,
        "price": this.productCreate.value.price,
        "stock": this.productCreate.value.stock
      }
      this.productService.updateProduct(request).subscribe({
        next: (res: any) => {
          this.orderService.updateCartProduct( request).subscribe({
            next: (res: any) => {

            }
          })

          this.saveforlaterService.updateSaveForLaterProduct(request).subscribe({
            next: (res: any) => {

            }
          })

          this.wishlistService.updateWishListProduct(request).subscribe({
            next: (res: any) => {

            }
          })
          //-------

          this.snackBar.open('Product Detail Updated', 'Success', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
          this.dialogRef.close(true)
          this.isLoading = false
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
    } else {
      this.formData = new FormData()
      this.formData.append('product-image', this.image!);
      // console.log(this.image);

      this.authService.ProductImageUpload(this.formData).subscribe({
        next: (data: any) => {
          const request = {
            "id":this.data?.product_id,
            "productname": this.productCreate.value.productname,
            "image": data.data.url,
            "description": this.productCreate.value.description,
            "cat_id": this.productCreate.value.cat_id,
            "price": this.productCreate.value.price,
            "stock": this.productCreate.value.stock
          }
          this.productService.updateProduct(request).subscribe({
            next: (res: any) => {
              this.orderService.updateCartProduct(request).subscribe({
                next: (res: any) => {

                }
              })

              this.saveforlaterService.updateSaveForLaterProduct(request).subscribe({
                next: (res: any) => {

                }
              })

              this.wishlistService.updateWishListProduct(request).subscribe({
                next: (res: any) => {

                }
              })
              //-------

              this.snackBar.open('Product Detail Updated', 'Success', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 3000,
              });
              this.dialogRef.close(true)
              this.isLoading = false
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
      })
    }

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
      // this.CreateProductss()
      this.isSubmit()
    }
  }

  ngAfterViewInit() {
    if (this.data !== null) {
      this.isEdit = true
      this.productCreate.patchValue(this.data)
      // setTimeout(() => {
      //   this.form?.form.setValue({
      //     productname: this.data.productname,
      //     image: null,
      //     description: this.data.description,
      //     price: this.data.price,
      //     cat_id: this.data.cat_id,
      //     stock: this.data.stock
      //   })
      // }, 100);
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


  //!mutiple image upload

  // multipleimage?: File[] = [];

  // MultipleFileSelected(event: any) {
  //   this.multipleimage = event.target.files;
  // }

  // !create product for multiplae image upload
  // CreateProductss(): void {
  //   this.formData = new FormData()
  //   for (let image of this.multipleimage!) {
  //     this.formData.append('product-images', image);
  //   }
  //   this.authService.ProductMultipleImageUpload(this.formData).subscribe({
  //     next: (data: any) => {
  //       // console.log(data.ids);
  //       let currentDate = new Date().toJSON().slice(0, 10)
  //       let currenttime = new Date().toLocaleTimeString()
  //       const request = {
  //         "productname": this.productCreate.value.productname,
  //         "description": this.productCreate.value.description,
  //         "image":data.ids,
  //         "price": this.productCreate.value.price,
  //         "cat_id": this.productCreate.value.cat_id,
  //         "stock": this.productCreate.value.stock,
  //         "user_id": this.userid,
  //         "quantity": 1,
  //         "created_date": currentDate,
  //         "created_time": currenttime
  //       }
  //       // { data: this.authService.encryptData(request) }
  //       this.productService.CreateProduct(request).subscribe({
  //         next: (data: any) => {
  //           console.log(data);

  //           this.snackBar.open('Product Created ', 'Success', {
  //             horizontalPosition: 'center',
  //             verticalPosition: 'top',
  //             duration: 3000
  //           })
  //           this.dialogRef.close(true)
  //         },
  //         error: (error: any) => {
  //           if (this.productCreate.value.email === this.productCreate.value.email || this.productCreate.value.username === this.productCreate.value.username) {
  //             this.snackBar.open('Product Name already exists', 'Error', {
  //               horizontalPosition: 'center',
  //               verticalPosition: 'top',
  //               duration: 3000,
  //             });
  //           } else {
  //             this.snackBar.open('Failed', 'Error', {
  //               horizontalPosition: 'center',
  //               verticalPosition: 'top',
  //               duration: 3000,
  //             });
  //           }
  //         }
  //       })
  //     }
  //   })
  // }

  //! Template driven forms

  //! import the formsModule
  // !import Ngform

  // productcreateform: Productcreateform = new Productcreateform()

  // @ViewChild("form") form: NgForm | undefined;

  // CreateProductssss(): void {
  //   console.log(this.form);
  //   // console.log(this.form?.controls['city'].untouched);
  //   // this.form?.reset()

  //   this.formData = new FormData()
  //   this.formData.append('product-image', this.image!);
  //   // console.log(this.image);

  //   this.authService.ProductImageUpload(this.formData).subscribe({
  //     next: (data: any) => {
  //       let currentDate = new Date().toJSON().slice(0, 10)
  //       let currenttime = new Date().toLocaleTimeString()
  //       const request = {
  //         "productname": this.form?.value.productname,
  //         "image": data.image,
  //         "description": this.form?.value.description,
  //         "price": this.form?.value.price,
  //         "cat_id": this.form?.value.cat_id,
  //         "stock": this.form?.value.stock,
  //         "user_id": this.userid,
  //         "quantity": 1,
  //         "created_date": currentDate,
  //         "created_time": currenttime
  //       }
  //       // { data: this.authService.encryptData(request) }
  //       this.productService.CreateProduct(request).subscribe({
  //         next: (data: any) => {
  //           this.snackBar.open('Product Created ', 'Success', {
  //             horizontalPosition: 'center',
  //             verticalPosition: 'top',
  //             duration: 3000
  //           })
  //           this.dialogRef.close(true)
  //           this.productcreateform = new Productcreateform
  //         },
  //         error: (error: any) => {
  //           this.snackBar.open('Product Name already exists', 'Error', {
  //             horizontalPosition: 'center',
  //             verticalPosition: 'top',
  //             duration: 3000,
  //           });
  //         }
  //       })
  //     }
  //   })
  // }

}
