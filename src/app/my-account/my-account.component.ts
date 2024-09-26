import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { AuthService } from '../../services/auth.service';

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
  authService = inject(AuthService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  dialog = inject(MatDialog)
  route = inject(Router)

  token = localStorage.getItem('token');
  userid = localStorage.getItem('userId');
  role = localStorage.getItem('role')

  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<MyAccountComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  ngOnInit() {
    this.myAccountForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, , Validators.minLength(8)]],
    })
  }

  // password hide / show icon
  visible: boolean = true
  changetype: boolean = true
  eye: boolean = false
  eyehide: string = 'fa-regular fa-eye-slash'

  viewPassword(): void {
    this.visible = !this.visible
    this.changetype = !this.changetype
    this.eye = !this.eye
    this.eyehide = !this.eye ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'
  }

  // update the data from service file
  updateUserDetail() {
    const request = {
      "id": this.data?.userDetail.userId,
      "firstname": this.myAccountForm.value.firstname,
      "lastname": this.myAccountForm.value.lastname,
      "email": this.myAccountForm.value.email,
      "password": this.myAccountForm.value.password
    }
    this.userService.UpdateUser(request).subscribe({
      next: (res: any) => {
        this.snackBar.open('User Detail Updated', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, 'Error', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.snackBar.open(error.error.error.message, 'Error', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
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

  // This will trigger the header function through the shared service
  triggerHeaderFunction() {
  
  }

  logOut() {
    const request2 = {
      "token": this.token,
      "id": this.userid
    }
    this.userService.TokenRemove(request2).subscribe({
      next: (res: any) => {

      }
    })

    this.snackBar.open('Logout Successfully', 'Success', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
    this.authService.logOut()
    this.dialogRef.close(true);
    this.route.navigateByUrl('/home')
    this.userService.triggerHeaderFunction();
    // window.location.reload();
  }
}
