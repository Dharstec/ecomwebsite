import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, TitleCasePipe } from '@angular/common';
// import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material/angular-material.module'
//
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductCollectionsComponent } from './product-collections/product-collections/product-collections.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailsComponent } from './product-collections/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductPersonalisedComponent } from './product-personalised/product-personalised.component';
import { GiftProductComponent } from './gift-product/gift-product.component';
import { NewArrivalsProductComponent } from './new-arrivals-product/new-arrivals-product.component';
import { CartComponent } from './cart/cart.component';
import { LoginSecurityComponent } from './login-security/login-security.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CustomerAddressComponent } from './customer-address/customer-address.component';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { YourAddressPageComponent } from './your-address-page/your-address-page.component';
import { RemoveAddressPopupComponent } from './your-address-page/remove-address-popup/remove-address-popup.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { LogoutPopupComponent } from './components/logout-popup/logout-popup.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductCollectionsComponent,
    FooterComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductPersonalisedComponent,
    GiftProductComponent,
    NewArrivalsProductComponent,
    CartComponent,
    LoginSecurityComponent,
    OrderDetailsComponent,
    CustomerAddressComponent,
    AddWishlistComponent,
    CarouselComponent,
    YourAddressPageComponent,
    RemoveAddressPopupComponent,
    LogoutPopupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ClipboardModule,
    // NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,

  ],
  providers: [
    TitleCasePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
