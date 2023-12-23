import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,SidebarComponent,NavbarComponent,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  constructor(private http: HttpClient) {}

  data: any[] = [];
  selectedCategoryId: string = '';
  name: string = '';
  sort_order: string = '';
  description: string = '';
  amount: string = '';
  price: string = '';
  file: File | null = null;  

  ngOnInit() {
    this.getData(); 
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


    if (this.file) {
      formData.append('file', this.file);
    }

    this.http.post<any>('http://localhost/insertproduct', formData)
      .subscribe(
        (response) => {
          console.log('Product added successfully.');
          alert('Product deleted successfully.');

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
