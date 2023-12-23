import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule,SidebarComponent,NavbarComponent],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryname: string = '';
  sort_order: string = '';
  description: string = '';
  file: File | null = null;
  categoryId: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.categoryId = id !== null ? +id : 0;
      console.log(this.categoryId);   
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
    formData.append('categoryname', this.categoryname);
    formData.append('sort_order', this.sort_order);
    formData.append('description', this.description);
    const headers = new HttpHeaders().set('productId', String(this.categoryId));

    if (this.file) {
      formData.append('file', this.file);
    }
    const url = `http://localhost/editgategory/${this.categoryId}`;

    this.http.post<any>(url, formData,{ headers })
      .subscribe(
        (response) => {
          console.log('Category updated successfully.');
        },
        (error) => {
          console.error('An error occurred while adding the category:', error);
        }
      );
  }

 
}