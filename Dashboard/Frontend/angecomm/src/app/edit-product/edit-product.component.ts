import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule,SidebarComponent,NavbarComponent,FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{


  constructor(private http: HttpClient,private route: ActivatedRoute,) {}

  data: any[] = [];
  selectedCategoryId: string = '';
  name: string = '';
  sort_order: string = '';
  description: string = '';
  amount: string = '';
  price: string = '';
  file: File | null = null;  
  productid: number = 0;

  ngOnInit() {
    this.getData(); 
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productid = id !== null ? +id : 0;
      console.log(this.productid);   
    });
  }


   handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.file = target.files[0];
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('amount', this.amount);
    formData.append('sort_order', this.sort_order);
    formData.append('description', this.description);
    formData.append('price', this.price);
    formData.append('category_id', this.selectedCategoryId);
    formData.append('id', String(this.productid));


    const headers = new HttpHeaders().set('productId', String(this.productid));


    if (this.file) {
      formData.append('file', this.file);
    }
    const url = `http://localhost/editproduct/${this.productid}`;
    this.http.post<any>(url, formData,{ headers } )
      .subscribe(
        (response) => {
          console.log('Product added successfully.');
        },
        (error) => {
          console.error('An error occurred while adding the Product:', error);
        }
      );
  }


  getData() {
    this.http.get<any[]>('http://localhost/categories').subscribe(data => {
      this.data = data;
    });
  }


}
