import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CreateProductComponent } from '../create-product/create-product.component';
import { ProductService } from '../../services/product.service';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [MatSelectModule, MatDialogModule, CommonModule, FormsModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {

  dialog = inject(MatDialog)
  route = inject(Router)
  productService = inject(ProductService)

  products: any[] = []
  categorylist: any[] = []

  categoryId: any = null
  search: string | null = null

  userid: any = JSON.parse(localStorage.getItem('userId')!)

  ngOnInit() {
    this.displayProducts()
    this.categoryList()
  }

  // show data from database
  displayProducts() {
    this.productService.getProductById(this.userid).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.products = data.data
      }
    })
  }

  // search filter
  searchFilter($event: Event): void {
    this.search = ($event.target as HTMLInputElement).value
    let filtertask = this.products.filter(product => product.productname.toLowerCase().includes(this.search!.toLowerCase()))
    this.products = filtertask
  }

  clearSearchFilter(): void {
    this.search = null;
    this.displayProducts()
  }

  // !search file from backend
  // searchFilter(event: Event): void {
  //   this.search = (event.target as HTMLInputElement).value
  //   this.productService.searchFilter(this.search).subscribe({
  //     next: (data: any) => {
  //       this.products = data.data
  //       this.displayProducts
  //     }
  //   })
  // }

  // list the category
  categoryList() {
    this.productService.categoryList().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.categorylist = data.data

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
      }
    })
  }

  // clear Filter
  clearCategoryFilter(): void {
    this.categoryId = null;
    this.displayProducts()
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
        }
      }
    })
  }

  // update the data 
  openProductUpdateDialog(product: any) {
    const dialog = this.dialog.open(CreateProductComponent, {
      width: '600px',
      height: '93%',
      data: { product }
    })
    dialog.afterClosed().subscribe({
      next: (res: any) => {
        if (res)
          this.displayProducts()
      }
    })
  }

  // delete the data
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
