import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {NoAuthGuardGuard} from "./core/guards/no-auth-guard.guard";

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/login'
  },
  {
    path: 'login',
    loadChildren: () => import('../app/modules/login/login.module')
      .then(mod => mod.LoginModule),
    canActivate: [NoAuthGuardGuard]
  },
  {
    path: 'map',
    loadChildren: () => import('../app/modules/maps/maps.module')
      .then(mod => mod.MapsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
