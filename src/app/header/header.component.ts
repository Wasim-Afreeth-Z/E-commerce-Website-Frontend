import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyAccountComponent } from '../my-account/my-account.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dialog = inject(MatDialog)
  userService = inject(UserService)

  token: any = localStorage.getItem('token');
  userid: any = localStorage.getItem('userId')

  menuIcon: string = "fa fa-bars"
  menuValue: boolean = true;

  openSidebar() {
    this.menuValue = !this.menuValue
    this.menuIcon = !this.menuValue ? "fa fa-close" : "fa fa-bars";
  }

  // update the data 
  openMyAccountDialog() {
    this.userService.getuser(this.userid).subscribe({
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

}
