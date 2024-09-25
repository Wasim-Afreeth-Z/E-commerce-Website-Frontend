import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CreateProductComponent } from '../create-product/create-product.component';
import { ProductService } from '../../services/product.service';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [MatSelectModule, MatDialogModule, CommonModule, FormsModule, RouterLink, MatPaginatorModule, MatTableModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {

  dialog = inject(MatDialog)
  route = inject(Router)
  snackBar = inject(MatSnackBar)
  productService = inject(ProductService)
  authService = inject(AuthService)

  products: any[] = []
  categorylist: any[] = []
  displayedColumns: string[] = ['product_id', 'productname', 'description', 'category', 'price', 'stock', 'action'];
  dataSource: any;

  categoryId: any = null
  search: string | null = null
  isLoading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator

  userid: any = JSON.parse(localStorage.getItem('userId')!)
  baseUrl = environment.BASEURL;

  ngOnInit() {
    this.displayProducts()
    this.categoryList()
  }

  // show data from database
  displayProducts() {
    const request = {
      "id": this.userid
    }
    this.productService.getProductById(request).subscribe({
      next: (data: any) => {
        // console.log(data);
        const response = this.authService.decryptData({ data: data })
        // console.log(response);

        this.products = response
        this.dataSource = response
        this.dataSource = new MatTableDataSource<any>(response)
        this.dataSource.paginator = this.paginator;
        this.isLoading = true
      },
      error: (error: any) => {
        // console.log(error);
        if (error.status === 404) {
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          localStorage.removeItem('role')
          this.authService.logOut()
          this.route.navigateByUrl('/home')
          // window.location.reload();
          this.snackBar.open(error.error.message, 'Error', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
        }

      }
    })
  }

  // search filter
  // searchFilter($event: Event): void {
  //   this.search = ($event.target as HTMLInputElement).value
  //   let filtertask = this.products.filter(product => product.productname.toLowerCase().includes(this.search!.toLowerCase()))
  //   this.products = filtertask
  // }

  clearSearchFilter(): void {
    this.search = null;
    this.displayProducts()
    this.isLoading = true
  }

  // !search file from backend
  searchFilter(event: Event): void {
    this.search = (event.target as HTMLInputElement).value
    const request = {
      "search": this.search,
      "user_id": this.userid
    }
    this.productService.searchFilterForDashboard(request).subscribe({
      next: (data: any) => {
        this.products = data.data
        this.displayProducts
        this.dataSource = data.data
        this.dataSource = new MatTableDataSource<any>(data.data)
        this.dataSource.paginator = this.paginator;
        this.isLoading = true
      }
    })
  }

  // list the category
  categoryList() {
    this.productService.categoryList().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.categorylist = data.data
        this.isLoading = true
      }
    })
  }

  // filter by category
  filterCategoryDashBoard(id: string) {
    const request = {
      "cat_id": id,
      "user_id": this.userid
    }
    this.productService.categoryFilterForDashboard(request).subscribe({
      next: (data: any) => {
        this.products = data.data
        this.dataSource = data.data
        this.dataSource = new MatTableDataSource<any>(data.data)
        this.dataSource.paginator = this.paginator;
        this.isLoading = true
      }
    })
  }

  // clear Filter
  clearCategoryFilter(): void {
    this.categoryId = null;
    this.displayProducts()
    this.isLoading = true
  }


  // It Open Product Create component 
  openProductCreateDailog(): void {
    const dialog = this.dialog.open(CreateProductComponent, {
      width: '600px',
      height: '93%',
      position: {
        top: '10px'
      }
    })
    dialog.afterClosed().subscribe({
      next: (res: boolean) => {
        if (res) {
          this.displayProducts()
          this.isLoading = true
        }
      }
    })
  }

  // update the product details
  openProductUpdateDialog(product: any) {
    // console.log(product);

    const dialog = this.dialog.open(CreateProductComponent, {
      width: '600px',
      height: '93%',
      data: {
        "product_id": product.product_id,
        "productname": product.productname,
        "product_image": product.image,
        "description": product.description,
        "cat_id": product.cat_id,
        "category": product.category,
        "price": product.price,
        "productcreater": product.productcreater,
        "quantity": product.quantity,
        "stock": product.stock
      }
    })
    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res)
          this.displayProducts()
      }
    })
  }

  // delete the product
  openProductDeleteDailog(id: string) {
    const dialog = this.dialog.open(DeleteProductComponent, {
      width: '600px',
      data: { id }
    })
    dialog.afterClosed().subscribe({
      next: (res: boolean) => {
        if (res) {
          this.displayProducts()
        }
      }
    })
  }

  back(): void {
    this.route.navigateByUrl('home')
  }

}
