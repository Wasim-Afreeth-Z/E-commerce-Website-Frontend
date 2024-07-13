import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss'
})
export class DeleteAccountComponent {
// if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<DeleteAccountComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  userService = inject(UserService)
  snackBar = inject(MatSnackBar)
  route = inject(Router)

  // delete the user account from service file
  deleteAccount() {
    this.userService.deleteAccount(this.data.id).subscribe({
      next: (res) => {
        this.snackBar.open('Account Deleted', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
        this.dialogRef.close(true)
        window.location.reload();
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.route.navigateByUrl('home')
      }
    })
  }

  close(){
    this.dialogRef.close(true);
 }
}
