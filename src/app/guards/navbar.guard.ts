import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { inject } from '@angular/core';
export const navbarGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  let isAuthenticated = false;

  auth.isAuthenticated$.subscribe((isAuth) => (isAuthenticated = isAuth));

  if (!isAuthenticated) {
    auth.loginWithRedirect();

    return false;
  }
  return true;
};
