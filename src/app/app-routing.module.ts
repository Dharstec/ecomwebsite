import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomerAddressComponent } from './customer-address/customer-address.component';
import { GiftProductComponent } from './gift-product/gift-product.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginSecurityComponent } from './login-security/login-security.component';
import { NewArrivalsProductComponent } from './new-arrivals-product/new-arrivals-product.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductCollectionsComponent } from './product-collections/product-collections/product-collections.component';
import { ProductDetailsComponent } from './product-collections/product-details/product-details.component';
import { ProductPersonalisedComponent } from './product-personalised/product-personalised.component';
import { YourAddressPageComponent } from './your-address-page/your-address-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'jewel', pathMatch: 'full' },
  { path: 'jewel', component: NavBarComponent,
  children: [
    { path: '', redirectTo: 'product-collections',pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'add-to-wishlist', component: AddWishlistComponent},
    { path: 'cart', component: CartComponent},
    { path: 'product-collections', component: ProductCollectionsComponent},
     { path: 'product-collections/details/:name', component: ProductDetailsComponent, },
     { path: 'product-personalised', component: ProductCollectionsComponent },
     { path: 'product-gifts', component: ProductCollectionsComponent},
     { path: 'product-new-arrivals', component: ProductCollectionsComponent},
     { path: 'login-security', component: LoginSecurityComponent},
     { path: 'order-details', component: OrderDetailsComponent},
     { path: 'customer-address', component: CustomerAddressComponent},
     { path: 'your-addresses', component: YourAddressPageComponent},
   ]},
  { path: '**', component: NavBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
