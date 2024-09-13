import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SuperAdminService } from '../../services/super-admin.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, RouterLink, MatPaginatorModule, MatTableModule],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.scss'
})
export class UserManageComponent {
  dialog = inject(MatDialog)
  route = inject(Router)
  snackBar = inject(MatSnackBar)
  SuperAdminService = inject(SuperAdminService)

  admins: any[] = []
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'password', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator

  userid: any = JSON.parse(localStorage.getItem('userId')!)

  isLoading: boolean = false

  ngOnInit() {
    this.DisplayUsers()
  }

  // show data from database
  DisplayUsers() {
    this.SuperAdminService.DisplayUsers().subscribe({
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


  // delete the admin
  openUserDeleteDailog(id: string) {
    const dialog = this.dialog.open(DeleteUserComponent, {
      width: '600px',
      data: { id }
    })
    dialog.afterClosed().subscribe({
      next: (res: boolean) => {
        if (res) {
          this.DisplayUsers()
        }
      }
    })
  }

  back(): void {
    this.route.navigateByUrl('dashboard-super-admin')
  }

}
