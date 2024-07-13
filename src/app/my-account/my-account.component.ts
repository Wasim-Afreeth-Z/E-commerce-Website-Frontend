import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {

  myAccountForm!: FormGroup

  // inject
  formBuilder = inject(FormBuilder)
  snackBar = inject(MatSnackBar)
  userService = inject(UserService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  dialog = inject(MatDialog)
  route = inject(Router)

  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<MyAccountComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  ngOnInit() {
    this.myAccountForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, , Validators.minLength(8)]],
    }) 
  }

  // update the data from service file
  updateUserDetail() {
    this.userService.UpdateUser(this.data?.userDetail.userId, this.myAccountForm.value).subscribe({
      next: (res: any) => {
        this.snackBar.open('User Detail Updated', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.dialogRef.close(true);
      }
    })
  }

  isSubmitted: boolean = false
  isSubmit(): void {
    this.isSubmitted = true
  }

  myAccountAndsubmit() {
    this.updateUserDetail()
    this.isSubmit()
  }

  ngAfterViewInit() {
    if (this.data !== null) {
      this.myAccountForm.patchValue(this.data?.userDetail)
      this.cdr.detectChanges()
    }
  }

  // delete the user Account
   openAccountDeleteDailog() {
    const id = this.data?.userDetail.userId
    const dialog = this.dialog.open(DeleteAccountComponent, {
      width: '600px',
      data: { id }
    })
  }

  close() {
    this.dialogRef.close(true);
  }

  logOut(){
    this.snackBar.open('Logout Successfully', 'Success', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.dialogRef.close(true);
    window.location.reload();
    this.route.navigateByUrl('home')
  }
}
