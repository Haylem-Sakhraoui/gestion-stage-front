import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (!localStorage.getItem('token')) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
