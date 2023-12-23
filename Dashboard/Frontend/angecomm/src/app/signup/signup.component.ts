import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse   } from '@angular/common/http'; 
import { provideRouter, Route, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,HttpClientModule ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  full_name : string = '';
  Email: string = '';
  Phone: string = '';
  Password: string = '';
  errorMessage: string = '';

  constructor(private router: Router,private http: HttpClient) {}
signup() {
    const data = {
      full_name: this.full_name,
      email: this.Email,
      phone: this.Phone,
      password: this.Password
    };

    const endpoint = 'http://localhost/signup';

    this.http.post<any>(endpoint, data).subscribe(
      response => {
        if (response.success) {
          console.log('Registration successful');
          this.router.navigate(['']); 

        } else {
          this.errorMessage = response.message; 
        }
      },
      (error: HttpErrorResponse) => {
        console.error('An error occurred:', error.error);
        this.errorMessage = 'An error occurred. Please try again later.'; 
      }
    );
  }

}