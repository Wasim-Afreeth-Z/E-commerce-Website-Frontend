import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, MatSelectModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signUpForm!: FormGroup
  formBuilder = inject(FormBuilder)
  userService = inject(UserService)

  snackBar = inject(MatSnackBar)
  route = inject(Router)
  

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      role: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
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

  isSubmitted: boolean = false
  isSubmit(): void {
    this.isSubmitted = true
  }

  // send the data to service file
  SignUp(): void {
    this.userService.SignUp(this.signUpForm.value).subscribe({
      next: (data: any) => {
        this.snackBar.open('SignUp Successfully', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
        this.route.navigateByUrl('login')
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

  signUpAndsubmit() {
    this.isSubmit()
    this.SignUp()
  }

}
