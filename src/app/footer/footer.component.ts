import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MyAccountComponent } from '../my-account/my-account.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  productService = inject(ProductService)
  dialog = inject(MatDialog)
  userService = inject(UserService)

  categorylist: any[] = []
  categoryId: any | null = null

  token: any = localStorage.getItem('token');
  userid: any = localStorage.getItem('userId')
  role: any = localStorage.getItem('role')

  @Output() filterCategoryFooter: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearCategoryFilterFooter: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.categoryList()
  }

  // open my account
  openMyAccountDialog() {
    const request = {
      "id": this.userid
    }
    this.userService.getuser(request).subscribe({
      next: (data: any) => {
        const userDetail = data
        const dialog = this.dialog.open(MyAccountComponent, {
          width: '600px',
          height: '93%',
          data: { userDetail }
        })
      }
    })
  }

  // list the category
  categoryList() {
    this.productService.categoryList().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.categorylist = data.data

      }
    })
  }

  filterCategory(id: string) {
    this.categoryId = id
    this.filterCategoryFooter.emit(this.categoryId)
  }

  clearCategoryFilter(){
    this.clearCategoryFilterFooter.emit()
  }

}
