import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import{LoginComponent} from './components/login/login.component';
import{RegisterComponent} from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canLoad: [AuthGuard]
  },
  {
    path: 'login',component: LoginComponent, canLoad: [IntroGuard, AutoLoginGuard]
  },
  {
    path: 'register',component: RegisterComponent,canLoad: [IntroGuard, AutoLoginGuard]
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
