import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateAdminComponent } from '../create-admin/create-admin.component';
import { DeleteAdminComponent } from '../delete-admin/delete-admin.component';

@Component({
  selector: 'app-admin-manage',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, RouterLink, MatPaginatorModule, MatTableModule],
  templateUrl: './admin-manage.component.html',
  styleUrl: './admin-manage.component.scss'
})
export class AdminManageComponent {

  dialog = inject(MatDialog)
  route = inject(Router)
  snackBar = inject(MatSnackBar)
  authService = inject(AuthService)

  admins: any[] = []
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'password', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator

  userid: any = JSON.parse(localStorage.getItem('userId')!)

  isLoading: boolean = false

  ngOnInit() {
    this.DisplayAdmins()
  }

  // show data from database
  DisplayAdmins() {
    this.authService.DisplayAdmins().subscribe({
      next: (data: any) => {
        this.admins = data.data
        this.dataSource = data.data
        this.dataSource = new MatTableDataSource<any>(data.data)
        this.dataSource.paginator = this.paginator;
        this.isLoading = true
      },
      error: (error: any) => {

      }
    })
  }

  // It Open Admin Create component 
  // openAdminCreateDailog(): void {
  //   const dialog = this.dialog.open(CreateAdminComponent, {
  //     width: '600px',
  //     height: '93%',
  //     position: {
  //       top: '10px'
  //     }
  //   })
  //   dialog.afterClosed().subscribe({
  //     next: (res: boolean) => {
  //       if (res) {
  //         this.DisplayAdmins()
  //       }
  //     }
  //   })
  // }

  // update the Admin details
  // openAdminUpdateDialog(admin: any) {
  //   const dialog = this.dialog.open(CreateAdminComponent, {
  //     width: '600px',
  //     height: '93%',
  //     data: { admin }
  //   })
  //   dialog.afterClosed().subscribe({
  //     next: (res: any) => {
  //       if (res)
  //         this.DisplayAdmins()
  //     }
  //   })
  // }

  // delete the admin
  openAdminDeleteDailog(id: string) {
    const dialog = this.dialog.open(DeleteAdminComponent, {
      width: '600px',
      data: { id }
    })
    dialog.afterClosed().subscribe({
      next: (res: boolean) => {
        if (res) {
          this.DisplayAdmins()
        }
      }
    })
  }

  back(): void {
    this.route.navigateByUrl('dashboard-super-admin')
  }

}
