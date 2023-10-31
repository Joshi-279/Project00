import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './components/homepage/homepage.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { BulkProductPageComponent } from './components/bulk-product-page/bulk-product-page.component';
import { CreateRequestPageComponent } from './components/create-request-page/create-request-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyRequestsPageComponent } from './components/my-requests-page/my-requests-page.component';
import { PendingRequestsPageComponent } from './components/pending-requests-page/pending-requests-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MenubarComponent } from './components/menubar/menubar.component';
import { MaterialModule } from './material.module';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckComponent } from './components/check/check.component';
import {NgChartsModule} from 'ng2-charts';
import { ProductTablePageComponent } from './components/product-table-page/product-table-page.component';
import { CategoryTablePageComponent } from './components/category-table-page/category-table-page.component';
// import { BulkUploadTestComponent } from './components/bulk-upload-test/bulk-upload-test.component';
// import { LoginTestComponent } from './components/login-test/login-test.component';
import { LoginTest2Component } from './components/login-test2/login-test2.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ManageRequestComponent } from './components/manage-request/manage-request.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    AddProductsComponent,
    BulkProductPageComponent,
    CreateRequestPageComponent,
    MyRequestsPageComponent,
    PendingRequestsPageComponent,
    MenubarComponent,
    TableComponent,
    DashboardComponent,
    CheckComponent,
    ProductTablePageComponent,
    CategoryTablePageComponent,
    // BulkUploadTestComponent,
    // LoginTestComponent,
    LoginTest2Component,
    MyprofileComponent,
    ManageRequestComponent,
    AdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
