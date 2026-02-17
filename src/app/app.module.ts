import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { Error403Component } from './components/error403/error403.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardSectionComponent } from './components/sections/dashboard-section/dashboard-section.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { NavBarComponent } from './components/shared/layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/shared/layout/side-bar/side-bar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StoreSectionComponent } from './components/sections/store-section/store-section.component';
import { StoreListComponent } from './components/sections/store-section/store-list/store-list.component';
import { StoreFormModalComponent } from './components/sections/store-section/store-form-modal/store-form-modal.component';
import { AlertComponent } from './utils/alert/alert.component';
import { CategorySectionComponent } from './components/sections/category-section/category-section.component';
import { CategoryListComponent } from './components/sections/category-section/category-list/category-list.component';
import { CategoryFormModalComponent } from './components/sections/category-section/category-form-modal/category-form-modal.component';
import { StoreSelectModalComponent } from './components/sections/store-section/store-select-modal/store-select-modal.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { ProductSectionComponent } from './components/sections/product-section/product-section.component';
import { ProductListComponent } from './components/sections/product-section/product-list/product-list.component';
import { ProductFormModalComponent } from './components/sections/product-section/product-form-modal/product-form-modal.component';
import { ProductSelectModalComponent } from './components/sections/product-section/product-select-modal/product-select-modal.component';
import { CategorySelectModalComponent } from './components/sections/category-section/category-select-modal/category-select-modal.component';
import { RialPipe } from './pipes/rial.pipe';
import { PersianNumberPipe } from './pipes/persian-number.pipe';
import { FactorSectionComponent } from './components/sections/factor-section/factor-section.component';
import { CustomerSectionComponent } from './components/sections/customer-section/customer-section.component';
import { CustomerListComponent } from './components/sections/customer-section/customer-list/customer-list.component';
import { CustomerFormModalComponent } from './components/sections/customer-section/customer-form-modal/customer-form-modal.component';
import { FactorFormModalComponent } from './components/sections/factor-section/factor-form-modal/factor-form-modal.component';
import { FactorListComponent } from './components/sections/factor-section/factor-list/factor-list.component';
import { FactorFromComponent } from './components/sections/factor-section/factor-from/factor-from.component';
import { CustomerSelectModalComponent } from './components/sections/customer-section/customer-select-modal/customer-select-modal.component';
import { ImageAssetSectionComponent } from './components/sections/image-asset-section/image-asset-section.component';
import { GalleryModalComponent } from './components/modals/gallery-modal/gallery-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ImageAssetUploadComponent } from './components/sections/image-asset-section/image-asset-upload/image-asset-upload.component';
import { UserSectionComponent } from './components/sections/user-section/user-section.component';
import { UserListComponent } from './components/sections/user-section/user-list/user-list.component';
import { ActivePipe } from './pipes/active.pipe';
import { GenderPipe } from './pipes/gender.pipe';
import { UserFormModalComponent } from './components/sections/user-section/user-form-modal/user-form-modal.component';
import { ImageAssetSelectModalComponent } from './components/sections/image-asset-section/image-asset-select-modal/image-asset-select-modal.component';
import { PersianDateModalComponent } from './components/modals/persian-date-modal/persian-date-modal.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { FactorDetailComponent } from './components/sections/factor-section/factor-detail/factor-detail.component';
import { FactorItemFormModalComponent } from './components/sections/factor-section/factor-item-form-modal/factor-item-form-modal.component';
import { WeblogSectionComponent } from './components/sections/weblog-section/weblog-section.component';
import { WeblogFormComponent } from './components/sections/weblog-section/weblog-form/weblog-form.component';
import { WeblogListComponent } from './components/sections/weblog-section/weblog-list/weblog-list.component';
import { WeblogViewComponent } from './components/sections/weblog-section/weblog-view/weblog-view.component';
import { PostCategorySectionComponent } from './components/sections/post-category-section/post-category-section.component';
import { PostCategoryListComponent } from './components/sections/post-category-section/post-category-list/post-category-list.component';
import { PostCategoryFormModalComponent } from './components/sections/post-category-section/post-category-form-modal/post-category-form-modal.component';
import { PostCategorySelectModalComponent } from './components/sections/post-category-section/post-category-select-modal/post-category-select-modal.component';
import { SectionHeaderComponent } from './components/shared/layout/section-header/section-header.component';
import { InvoiceViewComponent } from './components/sections/invoice-view/invoice-view.component';
import { WeblogComponent } from './components/weblog/weblog.component';
import { RoleSectionComponent } from './components/sections/role-section/role-section.component';
import { RoleListComponent } from './components/sections/role-section/role-list/role-list.component';
import { RoleFormModalComponent } from './components/sections/role-section/role-form-modal/role-form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    Error403Component,
    LoginComponent,
    DashboardSectionComponent,
    LayoutComponent,
    NavBarComponent,
    SideBarComponent,
    StoreSectionComponent,
    StoreListComponent,
    StoreFormModalComponent,
    AlertComponent,
    CategorySectionComponent,
    CategoryListComponent,
    CategoryFormModalComponent,
    StoreSelectModalComponent,
    ConfirmationModalComponent,
    ProductSectionComponent,
    ProductListComponent,
    ProductFormModalComponent,
    ProductSelectModalComponent,
    CategorySelectModalComponent,
    RialPipe,
    PersianNumberPipe,
    FactorSectionComponent,
    CustomerSectionComponent,
    CustomerListComponent,
    CustomerFormModalComponent,
    FactorFormModalComponent,
    FactorListComponent,
    FactorFromComponent,
    CustomerSelectModalComponent,
    ImageAssetSectionComponent,
    ImageAssetUploadComponent,
    GalleryModalComponent,
    UserSectionComponent,
    UserListComponent,
    ActivePipe,
    GenderPipe,
    UserFormModalComponent,
    ImageAssetSelectModalComponent,
    PersianDateModalComponent,
    FactorDetailComponent,
    FactorItemFormModalComponent,
    WeblogSectionComponent,
    WeblogFormComponent,
    WeblogListComponent,
    WeblogViewComponent,
    PostCategorySectionComponent,
    PostCategoryListComponent,
    PostCategoryFormModalComponent,
    PostCategorySelectModalComponent,
    SectionHeaderComponent,
    InvoiceViewComponent,
    WeblogComponent,
    RoleSectionComponent,
    RoleListComponent,
    RoleFormModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    LazyLoadImageModule,
    NgPersianDatepickerModule,
    ReactiveFormsModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
