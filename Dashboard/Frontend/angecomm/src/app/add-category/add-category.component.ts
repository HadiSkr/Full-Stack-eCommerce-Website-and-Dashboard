import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,SidebarComponent,NavbarComponent, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(private http: HttpClient) {}

  categoryname : string = '';
  sort_order: string = '';
  description: string = '';
   file: File | null = null;  
  
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.file = target.files[0];
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('categoryname', this.categoryname);
    formData.append('sort_order', this.sort_order);
    formData.append('description', this.description);
    if (this.file) {
      formData.append('file', this.file);
    }

    this.http.post<any>('http://localhost/insertCategory', formData)
      .subscribe(
        (response) => {
          console.log('Category added successfully.');
        },
        (error) => {
          console.error('An error occurred while adding the category:', error);
        }
      );
  }
}

