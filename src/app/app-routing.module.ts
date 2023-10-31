import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckComponent } from './components/check/check.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { BulkProductPageComponent } from './components/bulk-product-page/bulk-product-page.component';
import { ProductTablePageComponent } from './components/product-table-page/product-table-page.component';
import { CategoryTablePageComponent } from './components/category-table-page/category-table-page.component';
// import { BulkUploadTestComponent } from './components/bulk-upload-test/bulk-upload-test.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { LoginTest2Component } from './components/login-test2/login-test2.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { CreateRequestPageComponent } from './components/create-request-page/create-request-page.component';
import { ManageRequestComponent } from './components/manage-request/manage-request.component';
import { ManageRequestAdminService } from './services/manageRequestAdmin/manage-request-admin.service';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'myprofile', component: MyprofileComponent},
  { path: 'table', component: TableComponent, canActivate: [AuthGuardService]},
  { path: 'tableItemDetails/:productId', component: ProductTablePageComponent, canActivate: [AuthGuardService]},
  { path: 'categoryDetails/:category', component: CategoryTablePageComponent, canActivate: [AuthGuardService]},
  { path: 'addProducts', component: AddProductsComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: HomepageComponent, canActivate: [AuthGuardService]},
  { path: 'check', component: CheckComponent, canActivate: [AuthGuardService]},
  { path: 'bulkUploads', component: BulkProductPageComponent, canActivate: [AuthGuardService]},
  // { path: 'bulkUploadsTest', component: BulkUploadTestComponent, canActivate: [AuthGuardService]},
  { path: 'createRequest', component: CreateRequestPageComponent, canActivate: [AuthGuardService]},
  { path: 'manageRequest', component: ManageRequestComponent, canActivate: [AuthGuardService]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
