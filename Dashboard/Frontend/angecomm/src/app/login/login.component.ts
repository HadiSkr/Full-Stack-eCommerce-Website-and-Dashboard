import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, Route, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http'; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router,private http: HttpClient) {}

  signin() {
    const data = {
      email: this.email,
      password: this.password
    };

    const endpoint = 'http://localhost/signin';

    this.http.post<any>(endpoint, data).subscribe(
      response => {
        if (response.success) {
          console.log('Login successful');
          this.router.navigate(['']); 
        } else {
          console.log('Bad credentials or email not registered');
          this.errorMessage = 'Bad credentials or email not registered';
        }
      },
      (error: HttpErrorResponse) => {
        console.error('An error occurred:', error.error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }
}