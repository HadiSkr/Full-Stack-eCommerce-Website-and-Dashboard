import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-addcarousel',
  standalone: true,
  imports: [CommonModule,NavbarComponent, SidebarComponent,FormsModule],
  templateUrl: './addcarousel.component.html',
  styleUrl: './addcarousel.component.css'
})
export class AddcarouselComponent {
  constructor(private http: HttpClient) {}
  title : string = '';
  description: string = '';



  submitForm() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.http.post<any>('http://localhost/insertcarousel', formData)
      .subscribe(
        (response) => {
          console.log('carousel added successfully.');
        },
        (error) => {
          console.error('An error occurred while adding the carousel:', error);
        }
      );
  }
}
