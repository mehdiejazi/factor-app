import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './utils/auth-gaurd';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardSectionComponent } from './components/sections/dashboard-section/dashboard-section.component';
import { LayoutComponent } from './components/layout/layout.component';
import { StoreSectionComponent } from './components/sections/store-section/store-section.component';
import { CategorySectionComponent } from './components/sections/category-section/category-section.component';
import { ProductSectionComponent } from './components/sections/product-section/product-section.component';
import { FactorSectionComponent } from './components/sections/factor-section/factor-section.component';
import { CustomerSectionComponent } from './components/sections/customer-section/customer-section.component';
import { ImageAssetSectionComponent } from './components/sections/image-asset-section/image-asset-section.component';
import { UserSectionComponent } from './components/sections/user-section/user-section.component';
import { FactorListComponent } from './components/sections/factor-section/factor-list/factor-list.component';
import { FactorDetailComponent } from './components/sections/factor-section/factor-detail/factor-detail.component';
import { WeblogSectionComponent } from './components/sections/weblog-section/weblog-section.component';
import { GridWeblogComponent } from './components/sections/weblog-section/grid-weblog/grid-weblog.component';
import { FormWeblogComponent } from './components/sections/weblog-section/form-weblog/form-weblog.component';
import { ViewWeblogComponent } from './components/sections/weblog-section/view-weblog/view-weblog.component';
import { PostCategorySectionComponent } from './components/sections/post-category-section/post-category-section.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [

      { path: 'dashboard', component: DashboardSectionComponent, canActivate: [AuthGuard], },
      { path: 'stores', component: StoreSectionComponent, canActivate: [AuthGuard], },
      { path: 'categories', component: CategorySectionComponent, canActivate: [AuthGuard], },
      { path: 'products', component: ProductSectionComponent, canActivate: [AuthGuard], },
      {
        path: 'factors', component: FactorSectionComponent, canActivate: [AuthGuard],
        children: [{ path: '', redirectTo: 'list', pathMatch: 'full', },
        { path: 'list', component: FactorListComponent, canActivate: [AuthGuard], },
        { path: 'detail', component: FactorDetailComponent, canActivate: [AuthGuard], },
        ]
      },
      {
        path: 'weblog',
        component: WeblogSectionComponent,
        children: [{ path: '', redirectTo: 'grid', pathMatch: 'full' },
        { path: 'grid', component: GridWeblogComponent, canActivate: [AuthGuard], },
        { path: 'form', component: FormWeblogComponent, canActivate: [AuthGuard], },
        { path: 'view', component: ViewWeblogComponent, canActivate: [AuthGuard], }]
      },
      { path: 'postcats', component: PostCategorySectionComponent, canActivate: [AuthGuard], },
      { path: 'slides', component: PostCategorySectionComponent, canActivate: [AuthGuard], },
      { path: 'customers', component: CustomerSectionComponent, canActivate: [AuthGuard], },
      { path: 'gallery', component: ImageAssetSectionComponent, canActivate: [AuthGuard], },
      { path: 'users', component: UserSectionComponent, canActivate: [AuthGuard], },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

    ]
  },
  { path: 'home', component: HomeComponent, },
  { path: 'login', component: LoginComponent, },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
