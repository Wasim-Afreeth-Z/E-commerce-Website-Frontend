import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup
  formBuilder = inject(FormBuilder)
  userService = inject(UserService)
  authService = inject(AuthService)
  snackBar = inject(MatSnackBar)
  route = inject(Router)

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
  }

  isSubmitted: boolean = false
  isSubmit(): void {
    this.isSubmitted = true
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

  login() {
    const request = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.userService.login(request).subscribe({
      next: (res: any) => {
        // console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId)
        localStorage.setItem('role', res.role)
        this.authService.login()
        this.snackBar.open('Login successfully', 'success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });

        const request2 = {
          "token": res.token,
          "id": res.userId
        }
        this.userService.Token(request2).subscribe({
          next: (res: any) => {

          }
        })

        this.route.navigateByUrl('home');
      },
      error: (error: any) => {
        // console.log(error);
        this.snackBar.open(error.error.message, 'Error', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
    });
  }

  loginAndsubmit() {
    this.login()
    this.isSubmit()
  }

}
