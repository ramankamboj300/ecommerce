import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './frontend/home/home.component';
import { CheckoutComponent } from './frontend/checkout/checkout.component';
import { MainComponent } from './frontend/main/main.component';
import { ShopComponent } from './frontend/shop/shop.component';
import { MyaccountComponent } from './frontend/myaccount/myaccount.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { InvoiceComponent } from '../invoice/invoice.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"login",component:LoginComponent},
    {path:"invoice",component:InvoiceComponent},
    {path:"overview",component:DashboardComponent},
    {path:"orders",component:OrdersComponent},
    {path:"products",component:ProductsComponent,canActivate: [AuthGuard]},
    {path:"customers", component:CustomersComponent},
    {path:"homepage",component:MainComponent,
        children:[
    {path:"", component:HomeComponent},
    {path:"checkout", component:CheckoutComponent},
    {path:"shop", component:ShopComponent},
    {path:"myaccount", component:MyaccountComponent},
    {path:"product-detail",component:ProductDetailComponent}
        ]
    }
];
