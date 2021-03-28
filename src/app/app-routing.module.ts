import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { appDefaults } from 'src/environments/environment';
import { AuthGuardGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/'+appDefaults.rootCatId,
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate:[AuthGuardGuard]
  },

  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
    
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'add-category',
    loadChildren: () => import('./pages/add-category/add-category.module').then( m => m.AddCategoryPageModule),
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'add-kavithai',
    loadChildren: () => import('./pages/add-kavithai/add-kavithai.module').then( m => m.AddKavithaiPageModule),
    canActivate:[AuthGuardGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
