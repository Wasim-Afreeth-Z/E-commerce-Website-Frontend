import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.scss'
})
export class CreateAdminComponent {

  AdminForm!: FormGroup

  // inject
  formBuilder = inject(FormBuilder)
  snackBar = inject(MatSnackBar)
  authService = inject(AuthService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  userid: any = localStorage.getItem('userId')

  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<CreateAdminComponent>, @Inject(MAT_DIALOG_DATA) public data: any = null) { }

  ngOnInit() {
    this.AdminForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
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

  // send the data to service file
  CreateAdmin(): void {
    this.authService.CreateAdmin(this.AdminForm.value).subscribe({
      next: (data: any) => {
        this.dialogRef.close(true);
        this.snackBar.open('Admin Created', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
      },
      error: (error: any) => {
        console.log(error);

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

  // update the data from service file
  UpdateAdminDetail() {
    this.authService.UpdateAdminDetail(this.data?.admin.id, this.AdminForm.value).subscribe({
      next: (res: any) => {
        this.snackBar.open('Admin Detail Updated', 'Success', {
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
  isEdit: boolean = false

  isSubmit(): void {
    this.isSubmitted = true
  }

  CreateOrUpdate() {
    if (this.isEdit) {
      this.UpdateAdminDetail()
    } else {
      this.CreateAdmin()
      this.isSubmit()
    }
  }

  ngAfterViewInit() {
    if (this.data !== null) {
      this.isEdit = true
      this.AdminForm.patchValue(this.data?.admin)
      this.cdr.detectChanges()
    }
  }

  close() {
    this.dialogRef.close(true);
  }

}
