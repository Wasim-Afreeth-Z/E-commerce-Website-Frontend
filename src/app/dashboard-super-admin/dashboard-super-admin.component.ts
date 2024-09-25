import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SuperAdminService } from '../../services/super-admin.service';
import { environment } from '../environment/environment';
import { ProductService } from '../../services/product.service';
import { MatSelectModule } from '@angular/material/select';
import { DeleteProductComponent } from '../delete-product/delete-product.component';


@Component({
  selector: 'app-dashboard-super-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatPaginatorModule, MatSelectModule, MatTableModule],
  templateUrl: './dashboard-super-admin.component.html',
  styleUrl: './dashboard-super-admin.component.scss'
})
export class DashboardSuperAdminComponent {

  dialog = inject(MatDialog)
  route = inject(Router)
  snackBar = inject(MatSnackBar)
  productService = inject(ProductService)
  SuperAdminService = inject(SuperAdminService)

  products: any[] = []
  // categorylist: any[] = []
  displayedColumns: string[] = ['product_id', 'productname', 'description', 'category', 'price', 'stock', 'created by', 'action'];
  dataSource: any;

  categorylist: any[] = []
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
    this.SuperAdminService.DisplayProducts().subscribe({
      next: (data: any) => {
        this.products = data.data
        this.dataSource = data.data
        this.dataSource = new MatTableDataSource<any>(data.data)
        this.dataSource.paginator = this.paginator;
        this.isLoading = true
      },
      error: (error: any) => {
        // console.log(error);

      }
    })
  }

  // !search file from backend
  searchFilter(event: Event): void {
    this.search = (event.target as HTMLInputElement).value
    const request = {
      "input": this.search
    }
    this.SuperAdminService.searchFilterForProducts(request).subscribe({
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

  clearSearchFilter(): void {
    this.search = null;
    this.displayProducts()
    this.isLoading = true
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
  filterCategory(id: string) {
    const request = {
      "id": id
    }
    this.SuperAdminService.categoryFilter(request).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.categoryId = id
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

  back(): void {
    this.route.navigateByUrl('home')
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
}
