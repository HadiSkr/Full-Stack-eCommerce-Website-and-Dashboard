import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AdminsComponent } from './admins/admins.component';
import { MainComponent } from './main/main.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AddcarouselComponent } from './addcarousel/addcarousel.component';




import { provideRouter, Route, RouterLink } from '@angular/router';
export const routes: Routes = [

    { path:'login', component: LoginComponent },
    { path:'signup', component: SignupComponent },
    { path:'products', component: ProductsComponent },
    { path:'categories', component: CategoriesComponent },
    { path:'addcategories', component: AddCategoryComponent },
    { path:'addproducts', component: AddProductComponent },
    { path: 'editcategory/:id', component: EditCategoryComponent },
    { path: 'editproduct/:id', component: EditProductComponent },
    { path:'admins', component: AdminsComponent },
    { path:'', component: MainComponent },
    { path:'carousle', component: CarouselComponent },
    { path:'addcarousel', component: AddcarouselComponent },





];
