import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const canActiveGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if (authService.isAuthentication()) {
    return true
  } else {
    router.navigateByUrl('/home')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('role')  
    authService.logOut()
    return false
  } 
};
